(this.webpackJsonpsnakespeare=this.webpackJsonpsnakespeare||[]).push([[0],{63:function(e,t,r){},64:function(e,t,r){},65:function(e,t,r){},67:function(e,t,r){},68:function(e,t,r){},69:function(e,t,r){},70:function(e,t,r){},71:function(e,t,r){},72:function(e,t,r){},73:function(e,t,r){},74:function(e,t,r){},76:function(e,t,r){},77:function(e,t,r){},82:function(e,t,r){},83:function(e,t,r){},84:function(e,t,r){},85:function(e,t,r){},86:function(e,t,r){},87:function(e,t,r){},88:function(e,t,r){},89:function(e,t,r){},90:function(e,t,r){"use strict";r.r(t);var i,n,o=r(0),a=r.n(o),s=r(47),c=r.n(s),l=(r(63),r(5)),u=(r(64),r(20)),d=(r(65),r(1)),h=a.a.memo((function(e){var t=e.letter;return Object(d.jsx)("div",{className:"byteLetter",children:t})})),g=r(17),y=r(18),b=["about","above","actor","acute","admit","adopt","adult","after","again","agent","ahead","album","alive","allow","apart","apple","arena","array","audio","audit","avoid","award","aware","awful","bases","basic","beach","begun","bench","birth","black","blind","block","booth","bound","brand","brave","breed","bring","brown","build","built","burst","buyer","cable","carry","catch","chair","chart","check","child","civil","claim","class","clear","click","climb","clock","coach","count","court","cover","craft","crazy","cross","crowd","crown","curve","daily","dated","delay","depth","dirty","doubt","draft","drawn","dress","drill","drink","eight","elite","empty","enemy","enjoy","entry","error","event","exact","extra","faith","fault","fight","final","fixed","flash","fleet","floor","fluid","focus","force","forum","frame","frank","fraud","fresh","front","fruit","fully","funny","given","going","grace","grand","grant","grass","gross","group","guard","guess","guide","happy","heavy","hence","house","human","image","input","issue","joint","judge","knife","known","label","laugh","leave","legal","level","light","limit","local","logic","loose","lucky","lunch","lying","magic","major","maker","marry","match","metal","might","minor","mixed","model","money","month","motor","mouth","movie","music","naval","newly","novel","occur","often","paper","party","peace","phone","photo","piece","pilot","pitch","place","plain","plant","pound","power","press","price","prime","print","prior","prize","proof","proud","queen","quick","rapid","ratio","reach","reply","river","robin","rough","round","royal","rugby","rural","sheep","sheer","shell","shift","shirt","short","shown","sight","since","sized","sorry","spend","spent","stand","steep","stock","stuff","style","taken","taxes","teeth","thank","theft","their","theme","thick","think","third","threw","tight","title","total","track","train","trend","truck","truly","truth","twice","uncle","undue","union","unity","upper","vague","valid","value","video","virus","visit","vital","voice","watch","water","wheel","which","while","whole","woman","women","world","worry","would","wound","write","young","youth"],f=function(){function e(){Object(y.a)(this,e),this.byteList=[],this.index=0;var t=localStorage.getItem("byteList");t?this.byteList=JSON.parse(t):(this.byteList=this.shuffle(b),localStorage.setItem("byteList",JSON.stringify(this.byteList)));var r=localStorage.getItem("byteIndex");r?this.index=JSON.parse(r):(this.index=0,localStorage.setItem("byteIndex",JSON.stringify(this.index)))}return Object(g.a)(e,[{key:"shuffle",value:function(e){console.log("this should be called only once");for(var t,r=e.length;0!==r;){t=Math.floor(Math.random()*r),r--;var i=[e[t],e[r]];e[r]=i[0],e[t]=i[1]}return e}},{key:"getNextWord",value:function(){var e=this.byteList[this.index];return this.index=(this.index+1)%this.byteList.length,localStorage.setItem("byteIndex",JSON.stringify(this.index)),e}}]),e}(),v=function(){function e(){Object(y.a)(this,e),this.snakeEnds={tail:{row:5,col:5},head:{row:5,col:10}}}return Object(g.a)(e,[{key:"resetSnakeEnds",value:function(){this.setSnakeEnds({tail:{row:5,col:5},head:{row:5,col:10}})}},{key:"getSnakeEnds",value:function(){return this.snakeEnds}},{key:"setSnakeEnds",value:function(e){this.snakeEnds=e}},{key:"snakeAlive",value:function(){return!0}},{key:"snakeLength",value:function(){return 4}}]),e}();!function(e){e[e.None=0]="None",e[e.Up=1]="Up",e[e.Down=2]="Down",e[e.Right=3]="Right",e[e.Left=4]="Left"}(i||(i={})),function(e){e[e.Canvas=0]="Canvas",e[e.Body=1]="Body",e[e.WrongBody=2]="WrongBody",e[e.Head=3]="Head",e[e.Tail=4]="Tail",e[e.Byte=5]="Byte",e[e.HintedByte=6]="HintedByte",e[e.WrongByte=7]="WrongByte",e[e.CorrectByte=8]="CorrectByte",e[e.FirstHead=9]="FirstHead",e[e.FirstTail=10]="FirstTail"}(n||(n={}));var m,p=Object(g.a)((function e(){Object(y.a)(this,e),this.role=n.Canvas,this.direction=i.None,this.pivot=i.None,this.letter="",this.letterIndex=-1})),j=function(){function e(){Object(y.a)(this,e),this.grid=void 0,this.gridSize=void 0,this.snake=void 0,this.bytes=void 0,this.currentBytes="snake",this.letterIndex=0,this.hintsPerWord=2,this.hintList=void 0;var t=document.querySelector(":root"),r=getComputedStyle(t);this.gridSize=parseInt(r.getPropertyValue("--gridSize")),this.bytes=new f,this.grid=new Array(this.gridSize);for(var i=0;i<this.gridSize;i++)this.grid[i]=new Array(this.gridSize);for(var n=0;n<this.gridSize;n++)for(var o=0;o<this.gridSize;o++)this.grid[n][o]=new p;this.snake=new v,this.hintList=new Array(this.hintsPerWord)}return Object(g.a)(e,[{key:"getGrid",value:function(){return this.grid}},{key:"resetGrid",value:function(){for(var e=0;e<this.gridSize;e++)for(var t=0;t<this.gridSize;t++)this.grid[e][t].role=n.Canvas,this.grid[e][t].direction=i.None,this.grid[e][t].pivot=i.None,this.grid[e][t].letter="",this.grid[e][t].letterIndex=-1;this.letterIndex=0}},{key:"getGridSize",value:function(){return this.gridSize}},{key:"getSnake",value:function(){return this.snake}},{key:"getCurrentHeadDirection",value:function(){var e=this.snake.getSnakeEnds().head;return this.grid[e.row][e.col].direction}},{key:"getCurrentTailDirection",value:function(){var e=this.snake.getSnakeEnds().tail;return this.grid[e.row][e.col].direction}},{key:"setCurrentHeadDirection",value:function(e){var t=this.snake.getSnakeEnds().head;this.grid[t.row][t.col].direction=e}},{key:"getPivotDirectionOnCurrentTail",value:function(){var e=this.snake.getSnakeEnds().tail;return this.grid[e.row][e.col].pivot}},{key:"setCurrentTailDirection",value:function(e){var t=this.snake.getSnakeEnds().tail;this.grid[t.row][t.col].direction=e}},{key:"setPivotOnCurrentHeadDirection",value:function(e){var t=this.snake.getSnakeEnds().head;this.grid[t.row][t.col].pivot=e}},{key:"initGridData",value:function(){var e=this.snake.getSnakeEnds(),t=e.tail,r=e.head;if(this.grid[t.row][t.col].direction=i.None,this.grid[r.row][r.col].direction=i.None,this.grid[t.row][t.col].role=n.FirstTail,this.grid[r.row][r.col].role=n.FirstHead,t.row===r.row)for(var o=t.col+1;o<r.col;o++)this.grid[t.row][o].role=n.Body,this.grid[r.row][o].role=n.Body;else{if(t.col!==r.col)throw new Error("Snake init invalid");for(var a=t.row+1;a<r.row;a++)this.grid[a][t.col].role=n.Body,this.grid[a][t.col].role=n.Body}this.setRandomBytePositions()}},{key:"setRandomBytePositions",value:function(){this.currentBytes=this.bytes.getNextWord();for(var e=this.snake.getSnakeEnds().head,t=this.grid[e.row][e.col].direction,r=0;r<this.currentBytes.length;r++)for(;;){var o=Math.floor(Math.random()*this.gridSize),a=Math.floor(Math.random()*this.gridSize);if(this.grid[o][a].role===n.Canvas){var s=Math.abs(a-e.col),c=Math.abs(o-e.row);switch(t){case i.Right:case i.Left:case i.None:if(s<=3&&o===e.row){console.log("too close to head, horz");continue}break;case i.Up:case i.Down:if(c<=3&&a===e.col){console.log("too close to head, vertical");continue}break;default:throw new Error("Head direction default!")}this.grid[o][a].role=n.Byte,this.grid[o][a].letter=this.currentBytes.charAt(r).toUpperCase(),this.grid[o][a].letterIndex=r,r<this.hintsPerWord&&(this.hintList[r]={row:o,column:a});break}console.log("Invalid random position")}}},{key:"getLetterIndex",value:function(){return this.letterIndex}},{key:"incrementLetterIndex",value:function(){this.letterIndex=(this.letterIndex+1)%this.currentBytes.length}},{key:"getExpectedLetter",value:function(){return this.currentBytes.charAt(this.letterIndex)}},{key:"getCurrentBytes",value:function(){return this.currentBytes}},{key:"setHint",value:function(){var e=this.getLetterIndex();e<this.hintsPerWord&&(this.grid[this.hintList[e].row][this.hintList[e].column].role=n.HintedByte)}},{key:"resetHint",value:function(){for(var e=0;e<this.hintsPerWord;e++)this.grid[this.hintList[e].row][this.hintList[e].column].role===n.HintedByte&&(this.grid[this.hintList[e].row][this.hintList[e].column].role=n.Byte)}},{key:"getHintsPerWord",value:function(){return this.hintsPerWord}}]),e}(),O=(r(67),a.a.memo((function(e){var t=e.role,r=e.letter,o=e.letterIndex,a=e.currentHeadDirection,s=e.currentTailDirection,c=e.currentTailPivot,l=function(e){switch(e){case i.Down:return"t2b";case i.Up:return"b2t";case i.Left:return"r2l";case i.Right:return"l2r";case i.None:return alert("this should never hit"),"none";default:throw new Error("invalid dir")}},u=function(){switch(t){case n.FirstTail:case n.Canvas:return"box";case n.Head:return"head_".concat(l(a));case n.FirstHead:return"head_none";case n.Body:return"snake";case n.WrongBody:return"wrongBody";case n.Tail:return"tail_".concat(l(c!==i.None?c:s));case n.Byte:return"byte";case n.HintedByte:return"hintedByte";case n.WrongByte:return"wrongByte";case n.CorrectByte:return"correctByte";default:throw new Error("invalid role")}}();return u.startsWith("byte")&&(u="byte byte".concat(void 0!==o&&o>=0?o.toString():"")),u.startsWith("byte")||"hintedByte"===u||"correctByte"===u||"wrongByte"===u?Object(d.jsx)("div",{className:u,children:Object(d.jsx)(h,{letter:r})}):Object(d.jsx)("div",{className:u})}))),S=(r(68),function(e){var t=e.grid,r=e.currentHeadDirection,i=e.currentTailDirection,o=e.currentTailPivot;return Object(d.jsx)("div",{className:"grid",children:t.flat().map((function(e,t){return Object(d.jsx)(O,{role:e.role,letter:e.letter,id:t,letterIndex:""!==e.letter&&-1!==e.letterIndex?e.letterIndex:void 0,currentHeadDirection:e.role===n.Head?r:void 0,currentTailDirection:e.role===n.Tail?i:void 0,currentTailPivot:e.role===n.Tail?o:void 0},t)}))})}),k=r(51),w=(r(69),function(e){switch(e){case n.Body:return"b ";case n.Head:return"h ";case n.Tail:return"t ";case n.Canvas:return"c ";case n.Byte:return"f ";default:throw new Error("invalid role")}}),x=function(e){switch(e){case i.Down:return"d ";case i.Up:return"u ";case i.Left:return"l ";case i.Right:return"r ";case i.None:return"n ";default:throw new Error("invalid direction")}},C=function(e){var t=e.role,r=e.direction,i=e.pivot;return Object(d.jsxs)("div",{className:"debugBox",children:[t>0?w(t):null,r>0?x(r):null,t>0?x(i).toUpperCase():null]})},B=(r(70),function(e){var t=e.grid;return Object(d.jsx)("div",{className:"debugGrid",children:t.flat().map((function(e,t){return Object(d.jsx)(C,{letterIndex:e.letterIndex,role:e.role,letter:e.letter,direction:e.direction,pivot:e.pivot},t)}))})}),A=(r(71),r(16)),P=(r(72),r(73),a.a.memo((function(e){return Object(d.jsx)("div",{className:"tileContainer",children:Object(A.a)(e.score.toString()).map((function(e,t){return Object(d.jsx)("div",{className:"tile number",children:e},t)}))})}))),D=a.a.memo((function(e){return Object(d.jsx)("div",{className:"tileContainer",children:Object(A.a)(e.bytes).map((function(e,t){return Object(d.jsx)("div",{className:"tile letter",children:e},t)}))})})),N=a.a.memo((function(e){return Object(d.jsxs)("div",{className:"wordTilesContainer",children:[e.bytes?Object(d.jsx)(D,{bytes:e.bytes}):null,e.score>0?Object(d.jsx)(P,{score:e.score}):null]})})),H=(r(74),a.a.memo((function(e){var t=e.text;return"Text"!==t?Object(d.jsx)("div",{className:"banner openBanner",children:t}):Object(d.jsx)("div",{className:"banner closedBanner",children:t})}))),T=r(27),I=r(19),V=r.n(I);!function(e){e[e.Empty=0]="Empty",e[e.Podium=1]="Podium",e[e.Country=2]="Country",e[e.Score=3]="Score"}(m||(m={}));var L={row:1,col:4},z={row:2,col:3},E={row:3,col:2},G={row:1,col:0},W={row:2,col:0},M={row:3,col:0},J=Object(g.a)((function e(){Object(y.a)(this,e),this.role=m.Empty,this.value=null})),U=function(){function e(){Object(y.a)(this,e),this.grid=void 0,this.gridSize=5,this.grid=new Array(this.gridSize);for(var t=0;t<this.gridSize;t++)this.grid[t]=new Array(this.gridSize);for(var r=0;r<this.gridSize;r++)for(var i=0;i<this.gridSize;i++)this.grid[r][i]=new J;this.grid[1][0].role=this.grid[2][0].role=this.grid[3][0].role=m.Country,this.grid[1][0].value=this.grid[2][0].value=this.grid[3][0].value="US",this.grid[1][1].role=this.grid[1][2].role=this.grid[1][3].role=m.Podium,this.grid[2][1].role=this.grid[2][2].role=m.Podium,this.grid[3][1].role=m.Podium,this.grid[1][4].role=m.Score,this.grid[2][3].role=m.Score,this.grid[3][2].role=m.Score}return Object(g.a)(e,[{key:"getGoldData",value:function(){return{score:this.grid[L.row][L.col].value,country:this.grid[G.row][G.col].value}}},{key:"getSilverData",value:function(){return{score:this.grid[z.row][z.col].value,country:this.grid[W.row][W.col].value}}},{key:"getBronzeData",value:function(){return{score:this.grid[E.row][E.col].value,country:this.grid[M.row][M.col].value}}},{key:"setGoldData",value:function(e){this.grid[L.row][L.col].value=e.score,this.grid[G.row][G.col].value=e.country}},{key:"setSilverData",value:function(e){this.grid[z.row][z.col].value=e.score,this.grid[W.row][W.col].value=e.country}},{key:"setBronzeData",value:function(e){this.grid[E.row][E.col].value=e.score,this.grid[M.row][M.col].value=e.country}},{key:"getGrid",value:function(){return this.grid}},{key:"debugPrint",value:function(){for(var e=0;e<this.gridSize;e++){for(var t="",r=0;r<this.gridSize;r++)t+="".concat(this.grid[e][r].role,", ").concat(this.grid[e][r].value,"    ");console.log(t)}}}]),e}(),R=function(){var e=Object(T.a)(V.a.mark((function e(){var t,r,i,n,o;return V.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=localStorage.getItem("myCountry"))){e.next=6;break}if(r=JSON.parse(t),!(Math.floor((Date.now()-r.date)/864e5)<7)){e.next=6;break}return console.log("returning stored country code",r.flag),e.abrupt("return",r.flag);case 6:return"https://ipgeolocation.abstractapi.com/v1/?api_key=0a280173921d485985d6bb19559927bd",e.next=9,fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=0a280173921d485985d6bb19559927bd");case 9:if(200!==(i=e.sent).status){e.next=18;break}return e.next=13,i.json();case 13:return n=e.sent,o=n.flag.emoji,console.log("returning fetched country code",o),localStorage.setItem("myCountry",JSON.stringify({flag:o,date:Date.now()})),e.abrupt("return",o);case 18:return console.log("unable to fetch country code!"),e.abrupt("return","--");case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=function(){function e(){Object(y.a)(this,e),this.currentScore=0,this.myScores=void 0,this.myScoresGraph=new U;var t=localStorage.getItem("personalScores");t&&(this.myScores=JSON.parse(t),this.myScoresGraph.setGoldData(this.myScores.gold),this.myScoresGraph.setSilverData(this.myScores.silver),this.myScoresGraph.setBronzeData(this.myScores.bronze))}return Object(g.a)(e,[{key:"setCurrentScore",value:function(){var e=Object(T.a)(V.a.mark((function e(t){var r,i,n,o,a=arguments;return V.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=!(a.length>1&&void 0!==a[1])||a[1],this.currentScore=t,!r){e.next=4;break}return e.abrupt("return");case 4:if(!(t>this.myScores.gold.score)){e.next=16;break}return this.myScores.bronze.score=this.myScores.silver.score,this.myScores.silver.score=this.myScores.gold.score,this.myScores.gold.score=t,this.myScores.bronze.country=this.myScores.silver.country,this.myScores.silver.country=this.myScores.gold.country,e.next=12,R();case 12:i=e.sent,this.myScores.gold.country=i,e.next=35;break;case 16:if(!(t>this.myScores.silver.score&&t<this.myScores.gold.score)){e.next=26;break}return this.myScores.bronze.score=this.myScores.silver.score,this.myScores.silver.score=t,this.myScores.bronze.country=this.myScores.silver.country,e.next=22,R();case 22:n=e.sent,this.myScores.silver.country=n,e.next=35;break;case 26:if(!(t>this.myScores.bronze.score&&t<this.myScores.silver.score)){e.next=34;break}return this.myScores.bronze.score=t,e.next=30,R();case 30:o=e.sent,this.myScores.bronze.country=o,e.next=35;break;case 34:return e.abrupt("return");case 35:localStorage.setItem("personalScores",JSON.stringify(this.myScores)),this.myScoresGraph.setGoldData(this.myScores.gold),this.myScoresGraph.setSilverData(this.myScores.silver),this.myScoresGraph.setBronzeData(this.myScores.bronze);case 39:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getCurrentScore",value:function(){return this.currentScore}},{key:"getMyScoresGraph",value:function(){return this.myScoresGraph}}],[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}]),e}();Z.instance=void 0;var q=3200,Y=document.querySelector(":root"),F=getComputedStyle(Y).getPropertyValue("--tick"),K=1e3*parseFloat(F.substr(0,F.length-1)),X=new URL(window.location.href),Q=(new URLSearchParams(X.search),new j);Q.initGridData();var _=Q.getGridSize(),$=Q.getGrid(),ee=0,te="",re=function(e){var t=e.modalTitle,r=e.onGameEnd,a=Object(o.useState)(Q.getSnake().getSnakeEnds()),s=Object(l.a)(a,2),c=s[0],h=s[1],g=Object(o.useState)(!1),y=Object(l.a)(g,2),b=y[0],f=y[1],v=Object(o.useState)(!1),m=Object(l.a)(v,2),p=m[0],j=m[1],O=Object(o.useState)("Text"),w=Object(l.a)(O,2),x=w[0],C=w[1],A=Z.getInstance(),P=!1,D=localStorage.getItem("hints"),T=localStorage.getItem("progressiveSpeed"),I=D?JSON.parse(D):"true",V=T?JSON.parse(T):"true",L=Object(o.useRef)(null),z=Object(o.useRef)(null),E=Object(o.useRef)(b),G=function(){te=Q.getCurrentBytes().toUpperCase(),f(!1),E.current=!1,A.setCurrentScore(ee,!1),setTimeout((function(){r(),setTimeout((function(){Q.getSnake().resetSnakeEnds(),Q.resetGrid(),Q.initGridData(),h(Q.getSnake().getSnakeEnds()),clearTimeout(L),z.current=null,ee=0,te="",K=500,document.querySelector(":root").style.setProperty("--tick","0.5s")}),500)}),3e3)},W=function(e){var t=c.head.row,r=c.head.col,o=Q.getCurrentHeadDirection();$[t][r].role=n.Body,$[t][r].direction=i.None;var a=t,s=r;switch(o){case i.Up:a=c.head.row-1<0?_-1:c.head.row-1;break;case i.Down:a=c.head.row+1>=_?0:c.head.row+1;break;case i.Right:s=c.head.col+1>=_?0:c.head.col+1;break;case i.Left:s=c.head.col-1<0?_-1:c.head.col-1;break;default:return $[a][s].role=n.WrongBody,void G()}switch(e.head.row=a,e.head.col=s,$[a][s].role){case n.Tail:case n.Canvas:$[a][s].role=n.Head;break;case n.HintedByte:case n.Byte:var l=Q.getExpectedLetter().toUpperCase(),u=$[a][s].letter;if(u!==l)return $[a][s].role=n.WrongByte,void G();$[a][s].role=n.CorrectByte,te=Q.getLetterIndex()>0?te+u:u,Q.incrementLetterIndex();var d=Q.getLetterIndex();0===d?(Q.setRandomBytePositions(),function(){var e=new Date,t=Math.abs((e.getTime()-z.current.getTime())/1e3),r=Math.floor(100/t);switch(ee+=10,ee+=r>=2?r:0,A.setCurrentScore(ee),r){case 3:C("Brisk !"),setTimeout((function(){return C("Text")}),q);break;case 4:C("Speedy !"),setTimeout((function(){return C("Text")}),q);break;case 5:C("Electric !!"),setTimeout((function(){return C("Text")}),q);break;case 6:C("Supersonic !!"),setTimeout((function(){return C("Text")}),q);break;default:if(r>6){C("Hypersonic !!!"),setTimeout((function(){return C("Text")}),q);break}}z.current=new Date}(),J(),function(){if(V){var e=document.querySelector(":root");ee>=50&&ee<=80&&500===K?(e.style.setProperty("--tick","0.4s"),K=400):ee>80&&400===K&&(e.style.setProperty("--tick","0.3s"),K=300)}}()):d<=Q.getHintsPerWord()&&J();break;default:return $[a][s].role=n.WrongBody,void G()}$[a][s].direction=o},M=function(e){if(!function(e){var t=c.head.row,r=c.head.col;switch($[t][r].role){case n.Byte:case n.HintedByte:case n.CorrectByte:return!0}return!1}()){var t=c.tail.row,r=c.tail.col,o=$[t][r].pivot,a=o!==i.None?o:Q.getCurrentTailDirection();$[t][r].role=n.Canvas,$[t][r].direction=i.None,o!==i.None&&($[t][r].pivot=i.None);var s=t,l=r;switch(a){case i.Up:s=c.tail.row-1<0?_-1:c.tail.row-1;break;case i.Down:s=c.tail.row+1>=_?0:c.tail.row+1;break;case i.Right:l=c.tail.col+1>=_?0:c.tail.col+1;break;case i.Left:l=c.tail.col-1<0?_-1:c.tail.col-1;break;default:return alert("Invalid tail direction!"),void G()}e.tail.row=s,e.tail.col=l,$[s][l].role=n.Tail,$[s][l].direction=a}};!function(e,t){var r=Object(o.useRef)(e);Object(o.useLayoutEffect)((function(){r.current=e}),[e]),Object(o.useEffect)((function(){if(t){var e=setInterval((function(){return r.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){var e=Object(u.a)({},c),t=function(e){return M(e),W(e),e}(e);h(t),Q.getSnake().setSnakeEnds(e),P=!1}),b?K:null);var J=Object(o.useCallback)((function(){clearTimeout(L.current),Q.resetHint();var e=Q.getLetterIndex();I&&e<Q.getHintsPerWord()&&(L.current=setTimeout(U,14e3))}),[I]);Object(o.useEffect)((function(){""!==t&&(clearTimeout(L.current),f(!1),E.current=!1),I||J()}),[t,I,J]),Object(o.useEffect)((function(){b||""!==t||""!==te||setTimeout((function(){E.current||""!==t||(C("Swipe anywhere to start"),setTimeout((function(){return C("Text")}),q))}),7e3)}),[b,t]);var U=function(){Q.setHint()},R=Object(o.useCallback)((function(){if(""!==t)return f(!1),void(E.current=!1);if(!b){var e=Q.getCurrentTailDirection();Q.getCurrentHeadDirection()===i.None&&e===i.None&&(Q.setCurrentTailDirection(i.Right),Q.setCurrentHeadDirection(i.Right)),z.current||(z.current=new Date),J()}E.current=!b,f((function(e){return!e}))}),[b,t,J]),Y=(Object(o.useCallback)((function(){j((function(e){return!e}))}),[]),Object(k.useSwipeable)({onSwipedLeft:function(){if(!P)if(b){var e=Q.getCurrentHeadDirection();e!==i.Left&&e!==i.Right&&(Q.setCurrentHeadDirection(i.Left),Q.setPivotOnCurrentHeadDirection(i.Left),P=!0)}else R()},onSwipedRight:function(){if(!P)if(b){var e=Q.getCurrentHeadDirection();e!==i.Left&&e!==i.Right&&(Q.setCurrentHeadDirection(i.Right),Q.setPivotOnCurrentHeadDirection(i.Right),P=!0)}else R()},onSwipedDown:function(){if(!P)if(b){var e=Q.getCurrentHeadDirection();e!==i.Down&&e!==i.Up&&(Q.setCurrentHeadDirection(i.Down),Q.setPivotOnCurrentHeadDirection(i.Down),P=!0)}else R()},onSwipedUp:function(){if(!P)if(b){var e=Q.getCurrentHeadDirection();e!==i.Down&&e!==i.Up&&(Q.setCurrentHeadDirection(i.Up),Q.setPivotOnCurrentHeadDirection(i.Up),P=!0)}else R()},preventDefaultTouchmoveEvent:!0,trackMouse:!0}));return Object(d.jsx)("div",Object(u.a)(Object(u.a)({},Y),{},{className:"game",children:Object(d.jsxs)("div",{className:"gridContainer",children:[Object(d.jsx)(H,{text:x}),p?Object(d.jsx)(B,{grid:$}):Object(d.jsx)(S,{grid:$,currentHeadDirection:Q.getCurrentHeadDirection(),currentTailDirection:Q.getCurrentTailDirection(),currentTailPivot:Q.getPivotDirectionOnCurrentTail()}),Object(d.jsx)(N,{bytes:te,score:ee})]})}))},ie=(r(76),a.a.memo((function(e){return Object(d.jsx)("div",{className:"title",children:e.title})}))),ne=(r(77),r(115)),oe=r(52),ae=r(114),se=r(107),ce=r(108),le=r(109),ue=r(110),de=document.querySelector(":root"),he=getComputedStyle(de),ge=function(e){var t=Object(oe.a)({palette:{primary:{main:he.getPropertyValue("--fontColor").trim()}}});return Object(d.jsx)(ae.a,{theme:t,children:Object(d.jsxs)("div",{className:"header",children:[Object(d.jsxs)("div",{className:"menuleft",children:[Object(d.jsx)(ne.a,{"aria-label":"Menu",color:"primary",size:"small",children:Object(d.jsx)(se.a,{})}),Object(d.jsx)(ne.a,{"aria-label":"Instruction",color:"primary",size:"small",onClick:e.onClickInstructions,children:Object(d.jsx)(ce.a,{})})]}),Object(d.jsx)(ie,{title:"Snakespeare"}),Object(d.jsxs)("div",{className:"menuright",children:[Object(d.jsx)(ne.a,{"aria-label":"Stats",color:"primary",size:"small",onClick:e.onClickStatistics,children:Object(d.jsx)(le.a,{})}),Object(d.jsx)(ne.a,{"aria-label":"Settings",color:"primary",size:"small",onClick:e.onClickSettings,children:Object(d.jsx)(ue.a,{})})]})]})})},ye=(r(82),r(83),a.a.memo((function(e){var t=e.onClick,r=e.title;return Object(d.jsxs)("div",{className:"modalHeader",children:[Object(d.jsx)("div",{className:"titleContainer",children:Object(d.jsx)(ie,{title:r})}),Object(d.jsx)("button",{className:"close",onClick:t,children:"x"})]})}))),be=a.a.memo((function(e){var t=e.onClose,r=e.title,i=e.isWindow,n=Object(o.useState)("closed"),a=Object(l.a)(n,2),s=a[0],c=a[1],u=Object(o.useState)("floatingContainerWindow"),h=Object(l.a)(u,2),g=h[0],y=h[1];return Object(o.useEffect)((function(){""!==r&&c("modalOverlayIn"),y(i?"floatingContainerWindow":"floatingContainerFullScreen")}),[r,i]),e.children?Object(d.jsx)("div",{className:s,children:Object(d.jsxs)("div",{className:g,children:[Object(d.jsx)(ye,{onClick:t,title:r}),e.children]})}):null})),fe=r.p+"static/media/snakeSmile.c4c253be.gif",ve=(r(84),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("p",{children:"Swipe anywhere on the screen to start the game."}),Object(d.jsx)("p",{children:"Make turns by swiping anywhere: up, down, left or right"}),Object(d.jsx)("p",{children:"Steer the snake to capture the letters in the correct order and create a 5 letter word using the randomly placed letters."}),Object(d.jsx)("p",{children:"Score 10 points per word solved + bonus points for faster solutions."}),Object(d.jsx)("p",{children:"Avoid colliding the snake's head with it's own body."}),Object(d.jsx)("img",{src:fe,alt:"funny snake GIF"})]})),me=r(112),pe=(r(85),r(12)),je={inputProps:{"aria-label":"Hints"}},Oe={inputProps:{"aria-label":"Dark mode"}},Se=document.querySelector(":root"),ke=getComputedStyle(Se),we=ke.getPropertyValue("--byteColor"),xe=ke.getPropertyValue("--snakeColor"),Ce=Object(pe.a)(me.a)((function(e){e.theme;return{"& .MuiSwitch-switchBase.Mui-checked":{color:we.trim()},"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":{backgroundColor:we.trim()},"& .MuiSwitch-track":{backgroundColor:xe.trim()}}})),Be=function(){var e=localStorage.getItem("darkMode"),t=localStorage.getItem("hints"),r=localStorage.getItem("progressiveSpeed"),i=Object(o.useState)(!t||JSON.parse(t)),n=Object(l.a)(i,2),a=n[0],s=n[1],c=Object(o.useState)(!e||JSON.parse(e)),h=Object(l.a)(c,2),g=h[0],y=h[1],b=Object(o.useState)(!r||JSON.parse(r)),f=Object(l.a)(b,2),v=f[0],m=f[1];Object(o.useEffect)((function(){g?(Se.style.setProperty("--modalOverlayColor",ke.getPropertyValue("--darkModalOverlay").trim()),Se.style.setProperty("--appBackgroundColor",ke.getPropertyValue("--darkBackground").trim()),Se.style.setProperty("--statsOverlay",ke.getPropertyValue("--darkStatsOverlay").trim()),Se.style.setProperty("--fontColor",ke.getPropertyValue("--darkFont").trim()),Se.style.setProperty("--boxBackgroundColor",ke.getPropertyValue("--darkBox").trim())):(Se.style.setProperty("--modalOverlayColor",ke.getPropertyValue("--lightModalOverlay").trim()),Se.style.setProperty("--appBackgroundColor",ke.getPropertyValue("--lightBackground").trim()),Se.style.setProperty("--statsOverlay",ke.getPropertyValue("--lightStatsOverlay").trim()),Se.style.setProperty("--fontColor",ke.getPropertyValue("--lightFont").trim()),Se.style.setProperty("--boxBackgroundColor",ke.getPropertyValue("--lightBox").trim()))}),[g]);return Object(d.jsxs)("div",{className:"settingsContainer",children:[Object(d.jsxs)("div",{className:"rowContainer",children:[Object(d.jsx)("div",{className:"settingsTitleContainer",children:Object(d.jsx)("div",{className:"rowTitle",children:"Hints"})}),Object(d.jsx)(Ce,Object(u.a)(Object(u.a)({},je),{},{checked:a,onChange:function(e){try{localStorage.setItem("hints",JSON.stringify(e.target.checked))}catch(t){console.log("cannot write to localStorage ",t)}s(e.target.checked)}}))]}),Object(d.jsxs)("div",{className:"rowContainer",children:[Object(d.jsx)("div",{className:"settingsTitleContainer",children:Object(d.jsx)("div",{className:"rowTitle",children:"Dark mode"})}),Object(d.jsx)(Ce,Object(u.a)(Object(u.a)({},Oe),{},{checked:g,onChange:function(e){try{localStorage.setItem("darkMode",JSON.stringify(e.target.checked))}catch(t){console.log("cannot write to localStorage ",t)}y(e.target.checked)}}))]}),Object(d.jsxs)("div",{className:"rowContainer",children:[Object(d.jsx)("div",{className:"settingsTitleContainer",children:Object(d.jsx)("div",{className:"rowTitle",children:"Progressive speed"})}),Object(d.jsx)(Ce,Object(u.a)(Object(u.a)({},Oe),{},{checked:v,onChange:function(e){try{localStorage.setItem("progressiveSpeed",JSON.stringify(e.target.checked))}catch(t){console.log("cannot write to localStorage ",t)}m(e.target.checked)}}))]})]})},Ae={gold:{score:0,country:"--"},silver:{score:0,country:"--"},bronze:{score:0,country:"--"}},Pe=function(){var e=Object(T.a)(V.a.mark((function e(){var t;return V.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R();case 2:t=e.sent,localStorage.setItem("myCountry",JSON.stringify({flag:t,date:Date.now()}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),De=(r(86),["title","titleId"]);function Ne(){return Ne=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},Ne.apply(this,arguments)}function He(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},o=Object.keys(e);for(i=0;i<o.length;i++)r=o[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)r=o[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function Te(e,t){var r=e.title,i=e.titleId,n=He(e,De);return o.createElement("svg",Ne({viewBox:"0 0 24 24",width:"24px",height:"24px",ref:t,"aria-labelledby":i},n),r?o.createElement("title",{id:i},r):null,o.createElement("g",{id:"surface309442"},o.createElement("path",{style:{stroke:"none",fillRule:"nonzero",fill:"rgb(100%,100%,100%)",fillOpacity:1},d:"M 18 2 C 16.34375 2 15 3.34375 15 5 C 15 5.1875 15.019531 5.375 15.054688 5.558594 L 7.9375 9.710938 C 7.398438 9.25 6.710938 9 6 9 C 4.34375 9 3 10.34375 3 12 C 3 13.65625 4.34375 15 6 15 C 6.710938 15 7.394531 14.746094 7.9375 14.285156 L 15.054688 18.441406 C 15.019531 18.625 15 18.8125 15 19 C 15 20.65625 16.34375 22 18 22 C 19.65625 22 21 20.65625 21 19 C 21 17.34375 19.65625 16 18 16 C 17.289062 16 16.605469 16.253906 16.0625 16.714844 L 8.945312 12.558594 C 8.980469 12.375 9 12.1875 9 12 C 9 11.8125 8.980469 11.625 8.945312 11.441406 L 16.058594 7.289062 C 16.601562 7.75 17.289062 8 18 8 C 19.65625 8 21 6.65625 21 5 C 21 3.34375 19.65625 2 18 2 Z M 18 2 "})))}var Ie=o.forwardRef(Te),Ve=(r.p,a.a.memo((function(e){return Object(d.jsx)("button",{className:"button",onClick:e.onClick,children:Object(d.jsxs)("div",{className:"buttonContainer",children:[e.label,Object(d.jsx)(Ie,{className:"shareLogo"})]})})}))),Le=(r(87),r(88),r(89),a.a.memo((function(e){var t=e.role,r=e.value,i=function(e){switch(e){case m.Empty:return"basicBox empty";case m.Podium:return"basicBox podium";case m.Country:return"basicBox country";case m.Score:return"basicBox score";default:return alert("Invalid GraphRole"),"basicBox empty"}}(t);return Object(d.jsx)("div",{className:i,children:r})}))),ze=a.a.memo((function(e){var t=e.grid;return Object(d.jsx)("div",{className:"graphGridContainer",children:t.flat().map((function(e,t){return Object(d.jsx)(Le,{role:e.role,value:e.value},t)}))})})),Ee=window.navigator,Ge=a.a.memo((function(e){var t=Z.getInstance().getCurrentScore(),r=Z.getInstance().getMyScoresGraph(),i=Z.getInstance().getMyScoresGraph(),n=function(){var e=Object(T.a)(V.a.mark((function e(){var r;return V.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={title:"Snakespeare",text:"Current game score: ".concat(t," \n\n\ud83d\udfea \ud83d\udfea \ud83d\udfea ").concat(i.getGoldData().score,"\n\ud83d\udfea \ud83d\udfea ").concat(i.getSilverData().score,"\n\ud83d\udfea ").concat(i.getBronzeData().score,"\n"),url:"https://sarangkapadia.github.io/SnakeBytes/"},e.prev=1,e.next=4,navigator.share(r);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"statsContainer",children:[Object(d.jsx)("div",{className:"worldContainer",children:Object(d.jsxs)("div",{className:"overlayContainer",children:[Object(d.jsx)(ze,{grid:r.getGrid()}),Object(d.jsxs)("div",{className:"iconContainer",children:[Object(d.jsx)("img",{className:"statsIcon",src:"data:image/png;base64,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",alt:"world scores icon"}),Object(d.jsx)("div",{className:"iconLabel",children:"World"})]})]})}),Object(d.jsx)("div",{className:"personalContainer",children:Object(d.jsxs)("div",{className:"overlayContainer",children:[Object(d.jsx)(ze,{grid:i.getGrid()}),Object(d.jsxs)("div",{className:"iconContainer",children:[Object(d.jsx)("img",{className:"statsIcon",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAEIUlEQVR4nO3cTYhVZRzH8e8/LTIwezOCyLI3rSwKokUmiKX2DgVi2aKgZblrE23at4pCJNrapk0gBBZFoYYkQWSOkyam0aKIMouiUL8tzjVsYO50zsz9P7d7nw8Ms5g593eeH+c+3HPOcy5UVVVVVVVVVVUNqSi9A/2o1wPrgZXAcuBqYGHvzyeAY8AksAvYERGHS+zn/5I6X31K/cT2dqub1HmlxzHU1PvVgx0KnmpSXVd6PENHvUB9cw4KnuoNdUHp8Q0F9XL1swGUfMZedXHpcRbVK3lygCWfMTm2ZdtMF4M8kqfaq55fetzpHMycPJOtpcedSl1XoOQzHigx5vQTFnU+MAHckJ3dMwmsiIhTmaHnZIb1PEG5kqE5w9yQHVqi6OcKZE71fHZg6tRhc+3iUGbmNASui4gjWYHZR/T65LzpBJB6ip5d9MrkvH5WZYZlF31Tcl4/yzPDsou+KjmvnyWZYdlFL5z5X9JcmBmW/anDzLyZRETa+Et8jh5Ltegk2UX/lZzXz5+ZYdlF/5qc18+JzLDsor9NzuvnWGZYdtETyXn9HMgMyy56d3JeP7syw7KL3kFz5aw0afYlTWrRvSVbezIzp7E7Ir7JDCzxOfr1AplTvZYdWOKe4TxgP7AsO7tnArht5O8Z9ga4OTv3LJuzSy7KZl1cti2lx51OXWCzeijLHsdxpRKAutictXcH1MtKj7eoXtmfDrDkPY7rAsepbKaRrQMoeYvjOl30o95n8zafrf3qmtLjGWrqPPVJdZd6ukW5p9Wd6kZ16G5oDPtTWUtpFrqsolmqMPWprKM0ixZ30jyVlXpaXVVVVVVVVVVVNRKG7sxQXQTcDKwAbgFuBC4BLgIW9X4DHD/r52fgK5pbZF8CExGRuhJpJsWLVq8A1gD3AquBa+fopQ8DHwEfAB9GxPdz9LqdFClavR3YBDxIc9QOPJLmSH8XeCsivkjI/Je0otUlwGPA08AdWbnTmADeBrZFxDA8jjd76j3q9paXPLOcVt9XH1GLT6Otqeepz6r7SrbY0ufqM+q5pfv7T2yOjkNlO5uVg+oGh/UIV++yuSsyKj5W7yzd6z9svj7tZfVk2V4G4pT6qnMwnczq7aFeA2wD7p7tjgy5vcCmiPi66wt0LlpdDbxDc7Y2Do4Dj0bEzi4bdypaXQW8B4zbmok/gLUR0frJhdZFq5fS3Hke1yVWPwLLIuKnNht1Wf/wEuNbMjRjf7HtRl2KfrjDNqPmobYbdJk6fgfG/fs+f4uIVt/U0OWI/qHDNqOm9SXXLkVv77DNqGndQZep40pgH3Bx221HxC/ArRHR6nHr1kd0RHwHbCT5ofUhcRx4vG3JMLszw6XAC8BaYCkwv+trDbmTwBGaE7RXIuJo4f2pqqqqqqqqqqqqqqoq7m985FY49Ek1NQAAAABJRU5ErkJggg==",alt:"user scores icon"}),Object(d.jsx)("div",{className:"iconLabel",children:"Me"})]})]})}),Object(d.jsxs)("div",{className:"footerContainer",children:[Object(d.jsx)(P,{score:t}),Ee.canShare?Object(d.jsx)(Ve,{label:"Share",onClick:n}):null]})]})})),We={None:{title:"",children:null},About:{title:"About",children:null},Instructions:{title:"How to play",children:ve},Statistics:{title:"High Scores",children:Object(d.jsx)(Ge,{})},Setting:{title:"Settings",children:Object(d.jsx)(Be,{})}},Me=function(){var e=document.querySelector(":root"),t=getComputedStyle(e),r=localStorage.getItem("darkMode");!r||JSON.parse(r)?(e.style.setProperty("--modalOverlayColor",t.getPropertyValue("--darkModalOverlay").trim()),e.style.setProperty("--statsOverlay",t.getPropertyValue("--darkStatsOverlay").trim()),e.style.setProperty("--fontColor",t.getPropertyValue("--darkFont").trim()),e.style.setProperty("--boxBackgroundColor",t.getPropertyValue("--darkBox").trim())):(e.style.setProperty("--modalOverlayColor",t.getPropertyValue("--lightModalOverlay").trim()),e.style.setProperty("--statsOverlay",t.getPropertyValue("--lightStatsOverlay").trim()),e.style.setProperty("--appBackgroundColor",t.getPropertyValue("--lightBackground").trim()),e.style.setProperty("--fontColor",t.getPropertyValue("--lightFont").trim()),e.style.setProperty("--boxBackgroundColor",t.getPropertyValue("--lightBox").trim()));var i=localStorage.getItem("isFirst"),n=!i||JSON.parse(i);return n&&(console.log("first visit"),localStorage.setItem("isFirst",JSON.stringify(!n)),localStorage.setItem("personalScores",JSON.stringify(Ae))),n}();Me&&Pe();var Je=function(){var e=Object(o.useState)(Me?We.Instructions:We.None),t=Object(l.a)(e,2),r=t[0],i=t[1],n=function(){i(We.Statistics)},a=r.title===We.Instructions.title||r.title===We.Statistics.title;return Object(d.jsxs)("div",{className:"appContainer",children:[Object(d.jsx)(ge,{onClickInstructions:function(){i(We.Instructions)},onClickSettings:function(){i(We.Setting)},onClickStatistics:n}),Object(d.jsx)(be,{onClose:function(){i(We.None)},title:r.title,isWindow:a,children:r.children}),Object(d.jsx)(re,{modalTitle:r.title,onGameEnd:n})]})};c.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(Je,{})}),document.getElementById("root"))}},[[90,1,2]]]);
//# sourceMappingURL=main.8a22f998.chunk.js.map