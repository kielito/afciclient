export interface Usuario{
	dni_usuario?: number;
	pwd_usuario?: string; //se usa el signo ? para darle flexibilidad al objeto q recibo, q si no existe ese campo puede seguir en ejecucion (es opcional)
	nombre_usuario?: string;
	apellido_usuario?: string;
	organismo?: string;	
	pcia_usuario?: string;
	perfil_usuario?: string;	
}