(this.webpackJsonpsnake=this.webpackJsonpsnake||[]).push([[0],{61:function(e,t,r){},62:function(e,t,r){},63:function(e,t,r){},65:function(e,t,r){},66:function(e,t,r){},67:function(e,t,r){},68:function(e,t,r){},69:function(e,t,r){},70:function(e,t,r){},71:function(e,t,r){},72:function(e,t,r){},73:function(e,t,r){},78:function(e,t,r){},79:function(e,t,r){},80:function(e,t,r){},81:function(e,t,r){},82:function(e,t,r){"use strict";r.r(t);var i,n,a=r(0),o=r.n(a),c=r(45),s=r.n(c),l=(r(61),r(5)),d=(r(62),r(23)),u=(r(63),r(1)),h=o.a.memo((function(e){var t=e.letter;return Object(u.jsx)("div",{className:"byteLetter",children:t})})),g=r(24),f=r(25),b=["about","above","actor","acute","admit","adopt","adult","after","again","agent","ahead","album","alive","allow","apart","apple","arena","array","audio","audit","avoid","award","aware","bases","basic","beach","begun","bench","birth","black","blind","block","booth","bound","brand","breed","bring","brown","build","built","buyer","cable","carry","catch","chair","chart","check","child","civil","claim","class","clear","click","clock","coach","count","court","cover","craft","cross","crowd","crown","curve","daily","dated","delay","depth","doubt","draft","drawn","dress","drill","drink","eight","elite","empty","enemy","enjoy","entry","error","event","exact","extra","faith","fault","fight","final","fixed","flash","fleet","floor","fluid","focus","force","forum","frame","frank","fraud","fresh","front","fruit","fully","funny","given","going","grace","grand","grant","grass","gross","group","guard","guess","guide","happy","heavy","hence","house","human","image","input","issue","joint","judge","known","label","laugh","leave","legal","level","light","limit","local","logic","loose","lucky","lunch","lying","magic","major","maker","match","metal","might","minor","mixed","model","money","month","motor","mouth","movie","music","newly","novel","occur","often","paper","party","peace","phone","photo","piece","pilot","pitch","place","plain","plant","pound","power","press","price","prime","print","prior","prize","proof","proud","queen","quick","rapid","ratio","reach","river","robin","rough","round","royal","rural","shell","shift","shirt","shown","sight","since","sized","sorry","spend","spent","stand","stock","stuff","style","taken","taxes","teeth","thank","theft","their","theme","thick","think","third","threw","tight","title","total","track","train","trend","truck","truly","truth","twice","undue","union","unity","upper","valid","value","video","virus","visit","vital","voice","watch","water","wheel","which","while","whole","woman","women","world","worry","would","wound","write","young","youth"],v=function(){function e(){Object(f.a)(this,e),this.byteList=[],this.index=0;var t=localStorage.getItem("byteList");t?this.byteList=JSON.parse(t):(this.byteList=this.shuffle(b),localStorage.setItem("byteList",JSON.stringify(this.byteList)));var r=localStorage.getItem("byteIndex");r?this.index=JSON.parse(r):(this.index=0,localStorage.setItem("byteIndex",JSON.stringify(this.index)))}return Object(g.a)(e,[{key:"shuffle",value:function(e){console.log("this should be called only once");for(var t,r=e.length;0!==r;){t=Math.floor(Math.random()*r),r--;var i=[e[t],e[r]];e[r]=i[0],e[t]=i[1]}return e}},{key:"getNextWord",value:function(){var e=this.byteList[this.index];return this.index=(this.index+1)%this.byteList.length,localStorage.setItem("byteIndex",JSON.stringify(this.index)),e}}]),e}(),j=function(){function e(t){Object(f.a)(this,e),this.snakeEnds=void 0,this.snakeEnds=t||{tail:{row:5,col:5},head:{row:5,col:10}}}return Object(g.a)(e,[{key:"getSnakeEnds",value:function(){return this.snakeEnds}},{key:"setSnakeEnds",value:function(e){this.snakeEnds=e}},{key:"snakeAlive",value:function(){return!0}},{key:"snakeLength",value:function(){return 4}}]),e}();!function(e){e[e.None=0]="None",e[e.Up=1]="Up",e[e.Down=2]="Down",e[e.Right=3]="Right",e[e.Left=4]="Left"}(i||(i={})),function(e){e[e.Canvas=0]="Canvas",e[e.Body=1]="Body",e[e.Head=2]="Head",e[e.Tail=3]="Tail",e[e.Byte=4]="Byte",e[e.FirstHead=5]="FirstHead",e[e.FirstTail=6]="FirstTail"}(n||(n={}));var y=Object(g.a)((function e(){Object(f.a)(this,e),this.role=n.Canvas,this.direction=i.None,this.pivot=i.None,this.letter=""})),p=function(){function e(){Object(f.a)(this,e),this.grid=void 0,this.gridSize=void 0,this.snake=void 0,this.bytes=void 0,this.currentBytes="snake",this.letterIndex=0;var t=document.querySelector(":root"),r=getComputedStyle(t);this.gridSize=parseInt(r.getPropertyValue("--gridSize")),this.bytes=new v,this.grid=new Array(this.gridSize);for(var i=0;i<this.gridSize;i++)this.grid[i]=new Array(this.gridSize);for(var n=0;n<this.gridSize;n++)for(var a=0;a<this.gridSize;a++)this.grid[n][a]=new y;this.snake=new j}return Object(g.a)(e,[{key:"getGrid",value:function(){return this.grid}},{key:"getGridSize",value:function(){return this.gridSize}},{key:"getSnake",value:function(){return this.snake}},{key:"getCurrentHeadDirection",value:function(){var e=this.snake.getSnakeEnds().head;return this.grid[e.row][e.col].direction}},{key:"getCurrentTailDirection",value:function(){var e=this.snake.getSnakeEnds().tail;return this.grid[e.row][e.col].direction}},{key:"setCurrentHeadDirection",value:function(e){var t=this.snake.getSnakeEnds().head;this.grid[t.row][t.col].direction=e}},{key:"getPivotDirectionOnCurrentTail",value:function(){var e=this.snake.getSnakeEnds().tail;return this.grid[e.row][e.col].pivot}},{key:"setCurrentTailDirection",value:function(e){var t=this.snake.getSnakeEnds().tail;this.grid[t.row][t.col].direction=e}},{key:"setPivotOnCurrentHeadDirection",value:function(e){var t=this.snake.getSnakeEnds().head;this.grid[t.row][t.col].pivot=e}},{key:"initGridData",value:function(){var e=this.snake.getSnakeEnds(),t=e.tail,r=e.head;if(this.grid[t.row][t.col].direction=i.None,this.grid[r.row][r.col].direction=i.None,this.grid[t.row][t.col].role=n.FirstTail,this.grid[r.row][r.col].role=n.FirstHead,t.row===r.row)for(var a=t.col+1;a<r.col;a++)this.grid[t.row][a].role=n.Body,this.grid[r.row][a].role=n.Body;else{if(t.col!==r.col)throw new Error("Snake init invalid");for(var o=t.row+1;o<r.row;o++)this.grid[o][t.col].role=n.Body,this.grid[o][t.col].role=n.Body}this.setRandomBytePositions()}},{key:"setRandomBytePositions",value:function(){this.currentBytes=this.bytes.getNextWord();for(var e=0;e<this.currentBytes.length;e++)for(;;){var t=Math.floor(Math.random()*this.gridSize),r=Math.floor(Math.random()*this.gridSize);if(this.grid[t][r].role===n.Canvas){this.grid[t][r].role=n.Byte,this.grid[t][r].letter=this.currentBytes.charAt(e).toUpperCase();break}console.log("Invalid random position")}}},{key:"getLetterIndex",value:function(){return this.letterIndex}},{key:"incrementLetterIndex",value:function(){this.letterIndex=(this.letterIndex+1)%this.currentBytes.length}},{key:"getExpectedLetter",value:function(){return this.currentBytes.charAt(this.letterIndex)}}]),e}(),m=(r(65),o.a.memo((function(e){var t=e.role,r=e.letter,a=e.currentHeadDirection,o=e.currentTailDirection,c=e.currentTailPivot,s=function(e){switch(e){case i.Down:return"t2b";case i.Up:return"b2t";case i.Left:return"r2l";case i.Right:return"l2r";case i.None:return"none";default:throw new Error("invalid dir")}},l=function(){switch(t){case n.FirstTail:case n.Canvas:return"box";case n.Head:return"head_".concat(s(a));case n.FirstHead:return"head_none";case n.Body:return"snake";case n.Tail:return"tail_".concat(s(c!==i.None?c:o));case n.Byte:return"byte";default:throw new Error("invalid role")}}();return"byte"===l?Object(u.jsx)("div",{className:l,children:Object(u.jsx)(h,{letter:r})}):Object(u.jsx)("div",{className:l})}))),k=(r(66),function(e){var t=e.grid,r=e.currentHeadDirection,i=e.currentTailDirection,n=e.currentTailPivot;return Object(u.jsx)("div",{className:"grid",children:t.flat().map((function(e,t){return Object(u.jsx)(m,{role:e.role,letter:e.letter,id:t,currentHeadDirection:r,currentTailDirection:i,currentTailPivot:n},t)}))})}),w=r(49),O=(r(67),function(e){switch(e){case n.Body:return"b ";case n.Head:return"h ";case n.Tail:return"t ";case n.Canvas:return"c ";case n.Byte:return"f ";default:throw new Error("invalid role")}}),x=function(e){switch(e){case i.Down:return"d ";case i.Up:return"u ";case i.Left:return"l ";case i.Right:return"r ";case i.None:return"n ";default:throw new Error("invalid direction")}},S=function(e){var t=e.role,r=e.direction,i=e.pivot;return Object(u.jsxs)("div",{className:"debugBox",children:[t>0?O(t):null,r>0?x(r):null,t>0?x(i).toUpperCase():null]})},C=(r(68),function(e){var t=e.grid;return Object(u.jsx)("div",{className:"debugGrid",children:t.flat().map((function(e,t){return Object(u.jsx)(S,{role:e.role,letter:e.letter,direction:e.direction,pivot:e.pivot},t)}))})}),N=(r(69),r(16)),D=(r(70),r(71),o.a.memo((function(e){return Object(u.jsxs)("div",{className:"wordTilesContainer",children:[Object(u.jsx)("div",{className:"tileContainer",children:Object(N.a)(e.bytes).map((function(e,t){return Object(u.jsx)("div",{className:"tileLetter",children:e},t)}))}),Object(u.jsx)("div",{className:"tileContainer",children:Object(N.a)(e.score.toString()).map((function(e,t){return Object(u.jsx)("div",{className:"tileNumber",children:e},t)}))})]})}))),P=document.querySelector(":root"),B=getComputedStyle(P).getPropertyValue("--tick"),I=1e3*parseFloat(B.substr(0,B.length-1)),H=new URL(window.location.href),T=(new URLSearchParams(H.search),new p);T.initGridData();var E=T.getGridSize(),L=T.getGrid(),z=function(e){var t=e.modalTitle,r=Object(a.useState)(T.getSnake().getSnakeEnds()),o=Object(l.a)(r,2),c=o[0],s=o[1],h=Object(a.useState)(!1),g=Object(l.a)(h,2),f=g[0],b=g[1],v=Object(a.useState)(!1),j=Object(l.a)(v,2),y=j[0],p=j[1],m=Object(a.useState)(""),O=Object(l.a)(m,2),x=O[0],S=O[1],N=!1,P=localStorage.getItem("hints"),B=P?JSON.parse(P):"true";console.log("hints ON = ",B);var H=function(e){if(!function(e){var t=c.head.row,r=c.head.col;return L[t][r].role===n.Byte}()){var t=c.tail.row,r=c.tail.col,a=L[t][r].pivot,o=a!==i.None?a:T.getCurrentTailDirection();L[t][r].role=n.Canvas,L[t][r].direction=i.None,a!==i.None&&(L[t][r].pivot=i.None);var s=t,l=r;switch(o){case i.Up:s=c.tail.row-1<0?E-1:c.tail.row-1;break;case i.Down:s=c.tail.row+1>=E?0:c.tail.row+1;break;case i.Right:l=c.tail.col+1>=E?0:c.tail.col+1;break;case i.Left:l=c.tail.col-1<0?E-1:c.tail.col-1;break;default:b(!1);var d="Invalid tail direction!";throw alert(d),new Error(d)}e.tail.row=s,e.tail.col=l,L[s][l].role=n.Tail,L[s][l].direction=o}},z=function(e){return H(e),function(e){var t=c.head.row,r=c.head.col,a=T.getCurrentHeadDirection();L[t][r].role=n.Body,L[t][r].direction=i.None;var o=t,s=r;switch(a){case i.Up:o=c.head.row-1<0?E-1:c.head.row-1;break;case i.Down:o=c.head.row+1>=E?0:c.head.row+1;break;case i.Right:s=c.head.col+1>=E?0:c.head.col+1;break;case i.Left:s=c.head.col-1<0?E-1:c.head.col-1;break;default:b(!1);var l="Invalid head direction!";throw alert(l),new Error(l)}switch(e.head.row=o,e.head.col=s,L[o][s].role){case n.Tail:case n.Canvas:L[o][s].role=n.Head;break;case n.Byte:var d=T.getExpectedLetter().toUpperCase(),u=L[o][s].letter;if(u!==d){var h="Wrong letter, expected = ".concat(d,", letter = ").concat(u);throw alert(h),new Error(h)}var g=T.getLetterIndex()>0?x+u:u;S(g),T.incrementLetterIndex(),0===T.getLetterIndex()&&T.setRandomBytePositions();break;default:b(!1);var f="Head collision with invalid role , ".concat(L[o][s].role);throw alert(f),new Error(f)}L[o][s].direction=a}(e),e};!function(e,t){var r=Object(a.useRef)(e);Object(a.useLayoutEffect)((function(){r.current=e}),[e]),Object(a.useEffect)((function(){if(t){var e=setInterval((function(){return r.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){var e=Object(d.a)({},c),t=z(e);s(t),T.getSnake().setSnakeEnds(e),N=!1}),f?I:null),Object(a.useEffect)((function(){""!==t&&b(!1)}),[t]);var R=Object(a.useCallback)((function(){if(""===t){if(!f){var e=T.getCurrentTailDirection();T.getCurrentHeadDirection()===i.None&&e===i.None&&(T.setCurrentTailDirection(i.Right),T.setCurrentHeadDirection(i.Right))}b((function(e){return!e}))}else b(!1)}),[f,t]),M=(Object(a.useCallback)((function(){p((function(e){return!e}))}),[]),Object(w.useSwipeable)({onSwipedLeft:function(){if(!N)if(f){var e=T.getCurrentHeadDirection();e!==i.Left&&e!==i.Right&&(T.setCurrentHeadDirection(i.Left),T.setPivotOnCurrentHeadDirection(i.Left),N=!0)}else R()},onSwipedRight:function(){if(!N)if(f){var e=T.getCurrentHeadDirection();e!==i.Left&&e!==i.Right&&(T.setCurrentHeadDirection(i.Right),T.setPivotOnCurrentHeadDirection(i.Right),N=!0)}else R()},onSwipedDown:function(){if(!N)if(f){var e=T.getCurrentHeadDirection();e!==i.Down&&e!==i.Up&&(T.setCurrentHeadDirection(i.Down),T.setPivotOnCurrentHeadDirection(i.Down),N=!0)}else R()},onSwipedUp:function(){if(!N)if(f){var e=T.getCurrentHeadDirection();e!==i.Down&&e!==i.Up&&(T.setCurrentHeadDirection(i.Up),T.setPivotOnCurrentHeadDirection(i.Up),N=!0)}else R()},preventDefaultTouchmoveEvent:!0,trackMouse:!0}));return Object(u.jsxs)("div",Object(d.a)(Object(d.a)({},M),{},{className:"game",children:[Object(u.jsx)("div",{className:"gridContainer",children:y?Object(u.jsx)(C,{grid:L}):Object(u.jsx)(k,{grid:L,currentHeadDirection:T.getCurrentHeadDirection(),currentTailDirection:T.getCurrentTailDirection(),currentTailPivot:T.getPivotDirectionOnCurrentTail()})}),Object(u.jsx)(D,{bytes:x,score:123})]}))},R=(r(72),o.a.memo((function(e){return Object(u.jsx)("div",{className:"title",children:e.title})}))),M=(r(73),r(107)),V=r(50),F=r(106),U=r(99),J=r(100),A=r(101),G=r(102),q=document.querySelector(":root"),W=getComputedStyle(q),_=function(e){var t=Object(V.a)({palette:{primary:{main:W.getPropertyValue("--fontColor").trim()}}});return Object(u.jsx)(F.a,{theme:t,children:Object(u.jsxs)("div",{className:"header",children:[Object(u.jsxs)("div",{className:"menuleft",children:[Object(u.jsx)(M.a,{"aria-label":"Menu",color:"primary",size:"small",children:Object(u.jsx)(U.a,{})}),Object(u.jsx)(M.a,{"aria-label":"Instruction",color:"primary",size:"small",onClick:e.onClickInstructions,children:Object(u.jsx)(J.a,{})})]}),Object(u.jsx)(R,{title:"Snakespeare"}),Object(u.jsxs)("div",{className:"menuright",children:[Object(u.jsx)(M.a,{"aria-label":"Stats",color:"primary",size:"small",children:Object(u.jsx)(A.a,{})}),Object(u.jsx)(M.a,{"aria-label":"Settings",color:"primary",size:"small",onClick:e.onClickSettings,children:Object(u.jsx)(G.a,{})})]})]})})},X=(r(78),r(79),o.a.memo((function(e){var t=e.onClick,r=e.title;return Object(u.jsxs)("div",{className:"modalHeader",children:[Object(u.jsx)("div",{className:"titleContainer",children:Object(u.jsx)(R,{title:r})}),Object(u.jsx)("button",{className:"close",onClick:t,children:"X"})]})}))),K=o.a.memo((function(e){var t=e.onClose,r=e.title,i=Object(a.useState)("closed"),n=Object(l.a)(i,2),o=n[0],c=n[1];return Object(a.useEffect)((function(){c(""!==r?"modalOverlayIn":"modalOverlayOut"),""===r&&setTimeout((function(){return c("closed")}),400)}),[r]),Object(a.useEffect)((function(){c("closed")}),[]),Object(u.jsx)("div",{className:o,children:Object(u.jsxs)("div",{className:"modalContainer",children:[Object(u.jsx)(X,{onClick:t,title:r}),e.children]})})})),Q=r.p+"static/media/snakeSmile.c4c253be.gif",Y=(r(80),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{children:"Swipe anywhere on the screen to start the game."}),Object(u.jsx)("p",{children:"Navigate your snake by swiping left, right, up or down. This will change the direction of the snake's head."}),Object(u.jsx)("p",{children:"Steer the snake to capture the letters in the correct order and create a 5 letter word using the randomly placed letters. Score 100 points per word solved + bonus points for speedy solutions."}),Object(u.jsx)("p",{children:"Avoid colliding the snake's head with it's own body."}),Object(u.jsx)("img",{src:Q,alt:"funny snake GIF"})]})),Z=r(104),$=(r(81),r(12)),ee={inputProps:{"aria-label":"Hints"}},te={inputProps:{"aria-label":"Dark mode"}},re=document.querySelector(":root"),ie=getComputedStyle(re),ne=ie.getPropertyValue("--byteColor"),ae=ie.getPropertyValue("--snakeColor"),oe=Object($.a)(Z.a)((function(e){e.theme;return{"& .MuiSwitch-switchBase.Mui-checked":{color:ne.trim()},"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":{backgroundColor:ne.trim()},"& .MuiSwitch-track":{backgroundColor:ae.trim()}}})),ce=function(){var e=localStorage.getItem("darkMode"),t=localStorage.getItem("hints"),r=Object(a.useState)(!t||JSON.parse(t)),i=Object(l.a)(r,2),n=i[0],o=i[1],c=Object(a.useState)(!e||JSON.parse(e)),s=Object(l.a)(c,2),h=s[0],g=s[1];Object(a.useEffect)((function(){h?(re.style.setProperty("--appBackgroundColor",ie.getPropertyValue("--darkBackground").trim()),re.style.setProperty("--fontColor",ie.getPropertyValue("--darkFont").trim()),re.style.setProperty("--boxBackgroundColor",ie.getPropertyValue("--darkBox").trim())):(re.style.setProperty("--appBackgroundColor",ie.getPropertyValue("--lightBackground").trim()),re.style.setProperty("--fontColor",ie.getPropertyValue("--lightFont").trim()),re.style.setProperty("--boxBackgroundColor",ie.getPropertyValue("--lightBox").trim()))}),[h]);return Object(u.jsxs)("div",{className:"settingsContainer",children:[Object(u.jsxs)("div",{className:"rowContainer",children:[Object(u.jsx)("div",{className:"settingsTitleContainer",children:Object(u.jsx)("div",{className:"rowTitle",children:"Hints"})}),Object(u.jsx)(oe,Object(d.a)(Object(d.a)({},ee),{},{checked:n,onChange:function(e){try{localStorage.setItem("hints",JSON.stringify(e.target.checked))}catch(t){console.log("cannot write to localStorage ",t)}o(e.target.checked)}}))]}),Object(u.jsxs)("div",{className:"rowContainer",children:[Object(u.jsx)("div",{className:"settingsTitleContainer",children:Object(u.jsx)("div",{className:"rowTitle",children:"Dark mode"})}),Object(u.jsx)(oe,Object(d.a)(Object(d.a)({},te),{},{checked:h,onChange:function(e){try{localStorage.setItem("darkMode",JSON.stringify(e.target.checked))}catch(t){console.log("cannot write to localStorage ",t)}g(e.target.checked)}}))]})]})},se={None:{title:"",children:Object(u.jsx)(u.Fragment,{})},About:{title:"About",children:null},Instructions:{title:"How to play",children:Y},Stats:{title:"Statistics",children:null},Setting:{title:"Settings",children:Object(u.jsx)(ce,{})}};!function(){var e=document.querySelector(":root"),t=getComputedStyle(e),r=localStorage.getItem("darkMode");!r||JSON.parse(r)?(e.style.setProperty("--appBackgroundColor",t.getPropertyValue("--darkBackground").trim()),e.style.setProperty("--fontColor",t.getPropertyValue("--darkFont").trim()),e.style.setProperty("--boxBackgroundColor",t.getPropertyValue("--darkBox").trim())):(e.style.setProperty("--appBackgroundColor",t.getPropertyValue("--lightBackground").trim()),e.style.setProperty("--fontColor",t.getPropertyValue("--lightFont").trim()),e.style.setProperty("--boxBackgroundColor",t.getPropertyValue("--lightBox").trim()))}();var le=function(){var e=Object(a.useState)(se.None),t=Object(l.a)(e,2),r=t[0],i=t[1];return Object(u.jsxs)("div",{className:"appContainer",children:[Object(u.jsx)(_,{onClickInstructions:function(){i(se.Instructions)},onClickSettings:function(){i(se.Setting)}}),Object(u.jsx)(K,{onClose:function(){i(se.None)},title:r.title,children:r.children}),Object(u.jsx)(z,{modalTitle:r.title})]})};s.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(le,{})}),document.getElementById("root"))}},[[82,1,2]]]);
//# sourceMappingURL=main.37ee2b70.chunk.js.map