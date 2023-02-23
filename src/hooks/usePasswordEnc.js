
import bcrypt from 'bcryptjs';
import { useState, useCallback } from 'react';

export const usePasswordEnc = async () => {
    const [value, setValue] = useState('');
    const encrypt = useCallback(async () => {
        const salt = 1;
        const hashed = await bcrypt.hash(value, salt);
        return hashed;
    }, [value]);
    return [value, setValue, encrypt];
}