// grupo-user.interface.ts
export interface GrupoUser {
    id: number;
    fk_grupo: number;
    fk_users: number;
    created_at: string; // Ajusta según el formato real de tu timestamp
    updated_at: string; // Ajusta según el formato real de tu timestamp
}
