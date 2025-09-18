'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;
    
    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'Err 01: User already exists.'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: 'User created successfully. Sign In.'
        }


    } catch (e: any) {
        console.error('Err 02: This email is already in use', e);

        if(e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Err 02: This email is already in use.'
            }
        }
        return {
            success: false,
            message: 'Err 03: Error creating user.'
        }
    }

}

export async function setSessionCookie(idToken: string) {

    const cookieStore = await cookies();

        const sessionCookie = await auth.createSessionCookie(idToken, {
            expiresIn: 60 * 60 * 24 * 5 * 1000 // 5 days in ms
        });

        cookieStore.set('session', sessionCookie, {
            value: sessionCookie,
            maxAge: 60 * 60 * 24 * 5,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax'
        });

        // console.error('Err 07: Error setting session cookie', e);
        // return { success: false, message: 'Err 07: Error setting session cookie.' };
    
        // return { success: true };
     
}


export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: 'Err 04: User not found.'
            };
        }
        await setSessionCookie(idToken);

        // if (!cookieResult.success) {
        //     return {
        //         success: false,
        //         message: cookieResult.message || 'Err 05: Failed to set session cookie.'
        //     }
        // }

        // return {
        //     success: true,
        //     message: 'Signed in successfully.'
        // }
        
    } catch (e) {
        console.log('Err 06: Error signing in user', e);
        return {
            success: false,
            message: 'Err 06: Failed to log in.'
        }
    }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) return null;
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if (!userRecord.exists) return null;    
        
        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (e) {
        console.log(e);
        return null;
    }
}


export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}