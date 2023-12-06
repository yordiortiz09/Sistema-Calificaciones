import { Calificacion } from "./calificacion.interface";

export interface CalificacionProfesorAlumno {
    id: number;
    fk_calificacion: number;
    fk_materia: number;
    fk_profesor: number;
    fk_alumno: number;
    created_at: string;
    updated_at: string;
    calificacion?: Calificacion; // Relación con la calificación
}
