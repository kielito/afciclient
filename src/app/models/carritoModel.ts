export interface Compra{
	id?: number;
	precio?: number; //se usa el signo ? para darle flexibilidad al objeto q recibo, q si no existe ese campo puede seguir en ejecucion (es opcional)
	nombre?: string;
	cantidad?: number;
}