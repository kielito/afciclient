export interface Comentario{
	id?: number;
	usuario?: string; //se usa el signo ? para darle flexibilidad al objeto q recibo, q si no existe ese campo puede seguir en ejecucion (es opcional)
	fecha?:Date;
	comenario?: string;
	imagen?: string;	
}