// materia.interface.ts

export interface Materia {
    id: number;
    nombre: string;
    created_at: string; // Puedes ajustar el tipo de acuerdo a cómo lo necesites
    updated_at: string; // Puedes ajustar el tipo de acuerdo a cómo lo necesites
}

export interface MateriaGrupo {
    id: number;
    fk_materia: number;
    fk_grupo: number;
    created_at: string; // Puedes ajustar el tipo de acuerdo a cómo lo necesites
    updated_at: string; // Puedes ajustar el tipo de acuerdo a cómo lo necesites
}
