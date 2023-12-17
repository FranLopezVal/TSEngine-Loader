
import * as tse from 'enginets';
import { DogoAnimations } from '../animations/dogo.animations';

// Imagen spriteSheet de dogo
const __resources = ['/dogo.png']

// Crear gameobject del player
export const __gameobject = new tse.gameObject("dogo", 1);
//añadir componente sprite
__gameobject.addComponent(new tse.Sprite(__gameobject, __resources[0], new tse.vector2(4, 4),[199,198,196])); //,[199,198,196]
__gameobject.getComponent<tse.Sprite>(tse.Sprite)!.Size = 1; // tamaño del sprite
__gameobject.getComponent<tse.Sprite>(tse.Sprite)!.castShadows = true; // si el sprite emite sombras

// añadir componente animator (lo extraemos a una variable para poder modificarlo desde fuera)
export const __animator = new tse.Animator(__gameobject, DogoAnimations); 
__gameobject.addComponent(__animator); // añadir componente animator al gameobject

// añadir componente collider
export const __collider = new tse.Collider(__gameobject, new tse.Rectangle(0, 0, 32, 32));
__collider.Offset = new tse.vector2(16, 32); // offset del collider

__gameobject.addComponent(__collider);

// añadir componente rigidbody (para administrar colisiones con cualquier objeto que se pueda mover, o requiere de interaccion) 
export const __rigidbody = new tse.Rigidbody(__gameobject);
__rigidbody.useGravity = false; // for top down games
__gameobject.addComponent(__rigidbody);
