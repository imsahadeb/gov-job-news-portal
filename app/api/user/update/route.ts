import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
    try {
        // 1. Authenticate User
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const userId = decoded.userId;

        // 2. Parse Form Data
        const formData = await req.formData();

        // Extract fields
        const name = formData.get('name') as string;
        const address = formData.get('address') as string;
        const mobile = formData.get('mobile') as string;
        const dob = formData.get('dob') as string;
        const sex = formData.get('sex') as string;
        const bio = formData.get('bio') as string;
        const linkedin_url = formData.get('linkedin_url') as string;

        const currentPassword = formData.get('currentPassword') as string;
        const newPassword = formData.get('newPassword') as string;

        const resumeFile = formData.get('resume') as File | null;
        const photoFile = formData.get('photo') as File | null;

        // 3. Handle Password Change
        let passwordUpdateSql = '';
        let passwordParams: any[] = [];

        if (currentPassword && newPassword) {
            // Get current password hash
            const userRes = await query('SELECT password FROM users WHERE id = $1', [userId]);
            const user = userRes.rows[0];

            const match = await bcrypt.compare(currentPassword, user.password);
            if (!match) {
                return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
            }

            if (newPassword.length < 6) {
                return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            passwordUpdateSql = ', password = $2'; // parameter index will be adjusted
            passwordParams = [hashedPassword];
        }

        // 4. Handle File Uploads (Save to public/uploads)
        let resumeUrl = null;
        let photoUrl = null;

        const saveFile = async (file: File, folder: string) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create unique filename
            const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);

            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (e) { }

            await writeFile(path.join(uploadDir, filename), buffer);
            return `/uploads/${folder}/${filename}`;
        };

        if (resumeFile && resumeFile.size > 0) {
            resumeUrl = await saveFile(resumeFile, 'resumes');
        }

        if (photoFile && photoFile.size > 0) {
            photoUrl = await saveFile(photoFile, 'photos');
        }

        // 5. Construct Update Query efficiently
        // We will update fields if they are provided (for text) or if files are uploaded
        // A simple way is to just update everything provided.
        // But for SQL safety and simplicity, we can just run one big UPDATE if we assume client sends current values for unchanged fields?
        // Or specific updates.
        // Let's assume the client sends "profile" data as a block. If a field is missing in formData, should we null it or ignore?
        // Safest is to update what is provided.
        // Note: For Resume/Photo, we only update if new file is provided.

        const updateFields: string[] = [];
        const values: any[] = [userId]; // $1 is userId
        let paramIndex = 2; // Start from $2

        const addField = (col: string, val: any) => {
            if (val !== undefined && val !== null) {
                updateFields.push(`${col} = $${paramIndex}`);
                values.push(val);
                paramIndex++;
            }
        };

        addField('name', name);
        addField('address', address);
        addField('mobile', mobile);
        addField('dob', dob || null); // Handle empty string as null for DATE
        addField('sex', sex);
        addField('bio', bio);
        addField('linkedin_url', linkedin_url);

        if (resumeUrl) addField('resume_url', resumeUrl);
        if (photoUrl) addField('photo_url', photoUrl); // Assuming we map photo to photo_url column (migration said photo_url)
        // Note: Dashboard uses 'image' column for google/avatar. We added 'photo_url'.
        // We should probably update 'image' too if photo is uploaded, so the avatar updates everywhere.
        if (photoUrl) addField('image', photoUrl);

        // Password special case
        if (passwordUpdateSql) {
            updateFields.push(`password = $${paramIndex}`);
            values.push(passwordParams[0]);
            paramIndex++;
        }

        if (updateFields.length === 0) {
            return NextResponse.json({ message: 'No changes provided' });
        }

        const sql = `UPDATE users SET ${updateFields.join(', ')} WHERE id = $1 RETURNING id, name, email, image, resume_url, address, dob, mobile, sex, bio, linkedin_url`;

        const result = await query(sql, values);

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
            user: result.rows[0]
        });

    } catch (error: any) {
        console.error('Profile update error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
