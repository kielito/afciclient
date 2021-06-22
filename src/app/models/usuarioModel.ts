export interface Usuario{
	id?: number;
	nombre?: string; //se usa el signo ? para darle flexibilidad al objeto q recibo, q si no existe ese campo puede seguir en ejecucion (es opcional)
	email?: string;
	pasword?: string;
	rol?: string;
	alta?:Date;
	activado?: string;
	perfil?: string;	
}