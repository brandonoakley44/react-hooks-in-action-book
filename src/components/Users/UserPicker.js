
import data from '../../static.json';
import { useState } from 'react';
const { users } = data;
export default function UserPicker() {
    return(
        <select>
            {users.map((u,i) => (
                <option key={u.id}>{ u.name }</option>
            ))}
        </select>
    );
}