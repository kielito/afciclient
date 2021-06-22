/*******************************************************************************
*		DNI:33.111.151
*		APELLIDO/S: GOMEZ
*		NOMBRE/S: LEANDRO
*		PARCIAL: 2
*		FECHA: 17/06/2021
*******************************************************************************/

export interface Compra{
	id?: number;
	precio?: number; //se usa el signo ? para darle flexibilidad al objeto q recibo, q si no existe ese campo puede seguir en ejecucion (es opcional)
	nombre?: string;
	cantidad?: number;
}