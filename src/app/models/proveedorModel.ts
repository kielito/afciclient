export interface Proveedor{
	id?: number;
	tipodoc?: string;
    numerodoc?: number;
    razonsocial?: string; //se usa el signo ? para darle flexibilidad al objeto q recibo, q si no existe ese campo puede seguir en ejecucion (es opcional)
	email?: string;
	direccion?: string;
	localidad?: string;	
	provincia?: string;
	codigopostal?: number;
    descripcion?: number;
}