import './App.css'
import * as $ from 'enginets';
import * as player from './prefabs/player'

var ready = false;

const rendersTypes = [ //'PIXEL', 'RELATION' , 'MID_RELATION' , 'QUART_RELATION'];
{value : 'PIXEL', label : 'pixel', index: 0},
{value : 'RELATION', label : '1', index: 1},
{value : 'MID_RELATION', label : '1/2', index: 2},
{value : 'QUART_RELATION', label : '1/4', index: 3}
]


function App() {
  $.Engine.DEBUG  = false;
  if (ready) return (
    <>  <span className='contents'>*In development*</span>
        <div className='contents'>
        <span>Render Type (Experimental)</span>
        <select style={{borderRadius: '5px'}}
        onChange={(e) => $.Engine.getInstance().renderer!.RenderType = e.target.value}>
          {rendersTypes.map((render) => <option key={render.index} value={render.value}>{render.label}</option>)}
        </select>
        </div>
        <button className='contents' onClick={() => $.Engine.getInstance().renderer!.pauseGame = true}>
          Pause
        </button>
        <button className='contents' onClick={() => $.Engine.DEBUG = !$.Engine.DEBUG}>
          Toggle Debug
        </button>
    </>
  );
  ready = true;
  //Create a gameobject and components
  //Logic of scene
  let move: $.vector2 = $.vector2.zero();
  const velocity =4.4;

  //Clamp de la velocidad (la limitamos a 150)
  player.__gameobject.OnUpdate =
    () => {
      if(player.__rigidbody.velocity.x > 150)
        player.__rigidbody.velocity.x = 150;
      else if (player.__rigidbody.velocity.x < -150)
        player.__rigidbody.velocity.x = -150;

      if(player.__rigidbody.velocity.y > 150)
        player.__rigidbody.velocity.y = 150;
      else if (player.__rigidbody.velocity.y < -150)
        player.__rigidbody.velocity.y = -150;
    }
  ;
  //Inputs (Logica para el movimiento de dogo)
  $.Input.OnKeyDown = (
    (e: KeyboardEvent) => {
      move = $.vector2.zero();
      if (e.key === "ArrowLeft") {
        player.__animator.InitAnimation("left");
        move.x = -velocity;
        player.__rigidbody.addForce(move,"impulse");
      }
      else if (e.key === "ArrowRight") {
        player.__animator.InitAnimation("right");
        move.x = velocity;
        player.__rigidbody.addForce(move,"impulse");
      }
      else if (e.key === "ArrowUp") {
        player.__animator.InitAnimation("up"); 
        move.y = -velocity;
        player.__rigidbody.addForce(move,"impulse");
      }
      else if (e.key === "ArrowDown") {
        player.__animator.InitAnimation("down");
        move.y = velocity;
        player.__rigidbody.addForce(move,"impulse");
      }
    }
  );
  $.Input.OnKeyUp = (
    (e: KeyboardEvent) => {
      player.__animator.endAnimation();
  });

  //Creamos el gameobject para la Luz
  const __lightgo = new $.gameObject("light", 1, { x: 300, y: 300 });
  const __light = new $.Light(__lightgo, 200
    , 'ffff99',.2, $.LightShape.circle,true,20,.2); //Creamos la luz (La luz como tal es un componente)
  __lightgo.addComponent(__light); //Agregamos la luz al gameobject
  
  //Creamos la Scena (si quisieramos varios niveles creariamos varias escenas y asi...) permite gestionar los objetos de la escena mas facil
  const __scene = new $.Scene(new $.vector2(1800, 1600));
  __scene.addObject(player.__gameobject); //Agregamos el gameobject a la escena
  __scene.addObject(__lightgo); //Agregamos el gameobject a la escena

  //BUCLES PARA CREAR EL MAPA TEST
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
    const __floor = new $.gameObject("ground" + i + "j", 6, { x: 0 + (i * 64), y:(64*j)});
    __floor.addComponent(new $.Sprite(__floor, "./bg.png", new $.vector2(1, 1),null,true));
    
  __scene.addObject(__floor);
    }
  }
  let __f0 = null;
  for (let i = 0; i < 10; i++) {
    __f0 = new $.gameObject("floor" + i, 6, { x: 0 + (i * 64), y:(64*5)});
    __f0.addComponent(new $.Sprite(__f0, "./block-big.png", new $.vector2(1, 1)));
  __scene.addObject(__f0);
  }
  const coll = new $.Collider(__f0!, new $.Rectangle(0,0,64*10,64))
  coll.Offset = new $.vector2(-(64*9),0);
  __f0!.addComponent(coll);

  for (let i = 0; i < 10; i++) {
    const __floor = new $.gameObject("floor" + i, 6, { x: 64*6 + (i * 64), y:(64*8) });
    __floor.addComponent(new $.Sprite(__floor, "./block-big.png", new $.vector2(1, 1)));
    const coll = new $.Collider(__floor)
    __floor.addComponent(coll);
  __scene.addObject(__floor);
  }

  for (let i = 0; i < 5; i++) {
    const __floor = new $.gameObject("floor" + i, 6, { x: (64*16)  , y:(64*3) + (i * 64) });
    __floor.addComponent(new $.Sprite(__floor, "./block-big.png", new $.vector2(1, 1)));
    const coll = new $.Collider(__floor)
    __floor.addComponent(coll);
  __scene.addObject(__floor);
  }

  //FIN DE CREACION DE MAPA TEST

  // Creamos la camara (Actualmente no hace nada, esta en desarrollo)
  const __camGO = new $.gameObject("camera", 2, { x: 0, y: 0 });
  const __camera = new $.Camera(__camGO,1200,720,new $.vector2(0,0),1,0,__scene.getObjectsByName("dogo")[0]);
  __camGO.addComponent(__camera);
  __scene.addObject(__camGO);
  
  //Creamos la instancia del motor y lo iniciamos
  const __engine = $.Engine.getInstance();
  __engine.Init(__scene)
  __engine.Run()
}

export default App
