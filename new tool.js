(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"new tool_atlas_1", frames: [[0,0,2021,1185]]},
		{name:"new tool_atlas_2", frames: [[0,0,1610,1459]]},
		{name:"new tool_atlas_3", frames: [[0,0,2016,1134]]},
		{name:"new tool_atlas_4", frames: [[0,1013,1580,979],[0,0,2011,1011]]},
		{name:"new tool_atlas_5", frames: [[0,0,1241,932],[0,934,1633,692]]},
		{name:"new tool_atlas_6", frames: [[1371,1783,21,14],[435,1677,80,87],[517,1677,40,53],[1911,1242,22,58],[763,1777,44,53],[1563,691,65,57],[517,1732,36,32],[1068,1775,452,6],[1856,1242,53,53],[1336,1783,33,9],[1563,850,33,7],[2014,1661,28,51],[1046,1783,37,44],[1737,1684,83,80],[1933,1604,33,13],[343,1766,48,52],[393,1766,48,52],[443,1766,48,52],[493,1766,48,52],[1714,1766,48,52],[1856,1297,53,53],[1856,1352,53,53],[1856,1407,53,53],[1764,1766,48,52],[1904,1684,53,53],[1959,1684,53,53],[1333,1720,53,53],[1388,1720,53,53],[543,1776,53,45],[598,1776,53,45],[653,1777,53,45],[708,1777,53,45],[1608,1752,49,53],[1522,1775,48,51],[240,1677,101,105],[1994,1604,51,55],[1659,1752,53,48],[1443,1720,53,53],[1498,1720,53,53],[1553,1720,53,53],[1856,1462,51,8],[1911,1390,20,20],[1911,1412,20,20],[1904,1739,53,53],[809,1777,40,53],[1633,1472,148,148],[2014,1714,27,47],[958,1530,137,141],[0,1530,557,145],[1563,750,53,66],[689,1664,125,111],[943,1673,123,102],[116,1677,122,101],[816,1664,125,111],[559,1664,128,110],[1994,1661,18,17],[1308,1747,18,17],[1874,1766,18,17],[1316,1783,18,17],[851,1777,37,56],[890,1777,37,56],[929,1777,37,56],[968,1777,37,56],[1007,1777,37,56],[116,1780,37,56],[155,1780,37,56],[1814,1766,58,43],[1959,1739,53,51],[1177,1783,38,36],[194,1780,40,41],[343,1677,90,87],[1247,1747,25,25],[1615,1622,120,128],[1911,1302,15,58],[1138,1747,50,24],[1598,850,14,6],[1633,691,300,340],[1190,1747,55,21],[1068,1673,24,34],[1563,818,57,30],[1618,750,10,40],[1618,792,13,24],[1274,1747,32,17],[2014,1763,29,36],[2039,0,6,28],[1615,1557,10,28],[1911,1434,17,23],[1614,850,10,4],[1282,1783,32,17],[1911,1362,19,26],[1615,1530,13,25],[1911,1459,10,4],[1251,1783,29,32],[1737,1622,255,60],[1097,1530,257,62],[1356,1530,257,62],[1097,1594,257,62],[1097,1658,255,60],[1356,1594,257,62],[1135,1783,40,38],[1085,1783,48,32],[1354,1658,255,60],[1279,0,656,689],[1068,1747,68,24],[559,1530,397,132],[1937,0,100,800],[1783,1472,148,148],[1935,802,100,800],[0,1677,114,109],[0,0,1277,857],[1279,691,282,164],[1968,1604,23,13],[1909,1465,19,2],[1822,1684,80,80],[0,859,1631,669],[1633,1242,221,228],[1068,1720,263,25],[1068,1709,19,2],[1633,1033,297,207],[1572,1775,32,32],[1217,1783,32,32]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_155 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_152 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_150 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_149 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_151 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_153 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_154 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_148 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_147 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_142 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_143 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_144 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_145 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_146 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_141 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_137 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_138 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_140 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_139 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_135 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_132 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_131 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_136 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_128 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_134 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_121 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_119 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_116 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(82);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(83);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(84);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(85);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(86);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(87);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(88);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(89);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(90);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(91);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(92);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(93);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(94);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(95);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(96);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(97);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(98);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(99);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(100);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(101);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(102);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(103);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(104);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(105);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(106);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(107);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(108);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(109);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(110);
}).prototype = p = new cjs.Sprite();



(lib.Group = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(111);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(112);
}).prototype = p = new cjs.Sprite();



(lib.Asset51001 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(113);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap15 = function() {
	this.initialize(ss["new tool_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap18 = function() {
	this.initialize(ss["new tool_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap19 = function() {
	this.initialize(ss["new tool_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap20 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(114);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap26 = function() {
	this.initialize(ss["new tool_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.images1 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(115);
}).prototype = p = new cjs.Sprite();



(lib.sfrechfqf = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(116);
}).prototype = p = new cjs.Sprite();



(lib.Path_1 = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(117);
}).prototype = p = new cjs.Sprite();



(lib.whitrglossyrectanglebuttonmd = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(118);
}).prototype = p = new cjs.Sprite();



(lib.TextInput = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(119);
}).prototype = p = new cjs.Sprite();



(lib.boook = function() {
	this.initialize(img.boook);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3333,2083);


(lib.TextInputcopy = function() {
	this.initialize(ss["new tool_atlas_6"]);
	this.gotoAndStop(120);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["new tool_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["new tool_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["new tool_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(img.CachedBmp_53);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3241,1774);


(lib.CachedBmp_5 = function() {
	this.initialize(img.CachedBmp_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3163,1686);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3049,1913);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol36 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_151();
	this.instance.setTransform(-10.85,-13.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol36, new cjs.Rectangle(-10.8,-13.1,22,26.5), null);


(lib.Symbol34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_104();
	this.instance.setTransform(-5.15,-5.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.1,-5.2,10,10);


(lib.Symbol33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_150();
	this.instance.setTransform(-9.95,-13.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol33, new cjs.Rectangle(-9.9,-13.1,20,26.5), null);


(lib.Symbol31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_146();
	this.instance.setTransform(-11.75,-11.35,0.285,0.285);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.7,-11.3,23.6,22.8);


(lib.Symbol30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_149();
	this.instance.setTransform(-5.5,-14.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol30, new cjs.Rectangle(-5.5,-14.5,11,29), null);


(lib.Symbol29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_148();
	this.instance.setTransform(-1,-1.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol29, new cjs.Rectangle(-1,-1.5,226,3), null);


(lib.Symbol28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_147();
	this.instance.setTransform(-13.1,-13.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol28, new cjs.Rectangle(-13.1,-13.1,26.5,26.5), null);


(lib.Symbol26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_145();
	this.instance.setTransform(-9.2,-10.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol26, new cjs.Rectangle(-9.2,-10.9,18.5,22), null);


(lib.Symbol25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_144();
	this.instance.setTransform(-7,-12.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol25, new cjs.Rectangle(-7,-12.7,14,25.5), null);


(lib.Symbol24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_143();
	this.instance.setTransform(-8.15,-1.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol24, new cjs.Rectangle(-8.1,-1.6,16.5,3.5), null);


(lib.Symbol23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_142();
	this.instance.setTransform(-8.15,-2.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol23, new cjs.Rectangle(-8.1,-2.2,16.5,4.5), null);


(lib.Symbol22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_141();
	this.instance.setTransform(-8.15,-3.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol22, new cjs.Rectangle(-8.1,-3.3,16.5,6.5), null);


(lib.Symbol21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_140();
	this.instance.setTransform(-12,-13,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol21, new cjs.Rectangle(-12,-13,24,26), null);


(lib.Symbol20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_139();
	this.instance.setTransform(-12,-13,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol20, new cjs.Rectangle(-12,-13,24,26), null);


(lib.Symbol19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_138();
	this.instance.setTransform(-12,-13,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol19, new cjs.Rectangle(-12,-13,24,26), null);


(lib.Symbol18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_137();
	this.instance.setTransform(-12,-13,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol18, new cjs.Rectangle(-12,-13,24,26), null);


(lib.Symbol17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_136();
	this.instance.setTransform(-12,-13,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol17, new cjs.Rectangle(-12,-13,24,26), null);


(lib.Symbol16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_135();
	this.instance.setTransform(-12,-13,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol16, new cjs.Rectangle(-12,-13,24,26), null);


(lib.Symbol10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_114();
	this.instance.setTransform(-21.55,-22.95,0.4319,0.4319);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.5,-22.9,43.6,45.3);


(lib.sq = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_108();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sq, new cjs.Rectangle(0,0,74,74), null);


(lib.rectongle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_103();
	this.instance.setTransform(-94.4,-22.75,0.2524,0.2524);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.4,-22.7,140.60000000000002,36.6);


(lib.prebleu = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_100();
	this.instance.setTransform(-34.25,-35.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.2,-35.3,68.5,70.5);


(lib.place_zm = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_52();
	this.instance.setTransform(-2.2,-2.2,0.1449,0.1449);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.place_zm, new cjs.Rectangle(-2.2,-2.2,3.6,3.6), null);


(lib.Symbol1copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(159.85,-20.7,0.3476,0.3476);

	this.instance_1 = new lib.CachedBmp_94();
	this.instance_1.setTransform(154.55,-15.15,0.3476,0.3476);

	this.instance_2 = new lib.CachedBmp_93();
	this.instance_2.setTransform(151.7,-8.25,0.3476,0.3476);

	this.instance_3 = new lib.CachedBmp_92();
	this.instance_3.setTransform(141.75,-12.65,0.3476,0.3476);

	this.instance_4 = new lib.CachedBmp_91();
	this.instance_4.setTransform(132.4,-12.65,0.3476,0.3476);

	this.instance_5 = new lib.CachedBmp_90();
	this.instance_5.setTransform(125.05,-16.65,0.3476,0.3476);

	this.instance_6 = new lib.CachedBmp_89();
	this.instance_6.setTransform(119.8,-16.65,0.3476,0.3476);

	this.instance_7 = new lib.CachedBmp_88();
	this.instance_7.setTransform(114.1,-14.8,0.3476,0.3476);

	this.instance_8 = new lib.CachedBmp_93();
	this.instance_8.setTransform(111.25,-8.25,0.3476,0.3476);

	this.instance_9 = new lib.CachedBmp_86();
	this.instance_9.setTransform(101.35,-12.65,0.3476,0.3476);

	this.instance_10 = new lib.CachedBmp_85();
	this.instance_10.setTransform(95.35,-11.55,0.3476,0.3476);

	this.instance_11 = new lib.CachedBmp_84();
	this.instance_11.setTransform(89.1,-11.95,0.3476,0.3476);

	this.instance_12 = new lib.CachedBmp_83();
	this.instance_12.setTransform(86.45,-8.25,0.3476,0.3476);

	this.instance_13 = new lib.CachedBmp_82();
	this.instance_13.setTransform(76.45,-14.3,0.3476,0.3476);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(76.5,-20.7,86.9,20.599999999999998);


(lib.mokabir = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_81();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,150,170);


(lib.kardrzoom = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_53();
	this.instance.setTransform(-65.65,-35.9,0.0406,0.0406);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kardrzoom, new cjs.Rectangle(-65.6,-35.9,131.39999999999998,72), null);


(lib.grey_tool = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_75();
	this.instance.setTransform(8,0,0.4934,0.4934);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.grey_tool, new cjs.Rectangle(8,0,992.2,498.8), null);


(lib.an_TextInput = function(options) {
	this.initialize();
	this._element = new $.an.TextInput(options);
	this._el = this._element.create();
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,100,22);

p._tick = _tick;
p._handleDrawEnd = _handleDrawEnd;
p._updateVisibility = _updateVisibility;
p.draw = _componentDraw;



(lib.an_TextInput = function(options) {
	this.initialize();
	this._element = new $.an.TextInput(options);
	this._el = this._element.create();
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,100,22);

p._tick = _tick;
p._handleDrawEnd = _handleDrawEnd;
p._updateVisibility = _updateVisibility;
p.draw = _componentDraw;



(lib.Symbol349copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.CachedBmp_59();
	this.instance.setTransform(-163.95,39.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.9,39.2,328,344.5);


(lib.Symbol349 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.CachedBmp_59();
	this.instance.setTransform(-163.95,39.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.9,39.2,328,344.5);


(lib.Symbol34_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.CachedBmp_57();
	this.instance_1.setTransform(-5.35,-5.4,0.2694,0.2694);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.3,-5.4,10.2,9.7);


(lib.Symbol31_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(-319.15,-214.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-319.1,-214.2,638.5,428.5);


(lib.Symbol30_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.CachedBmp_55();
	this.instance_1.setTransform(-11.7,-11.4,0.2619,0.2619);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.7,-11.4,23.6,22.8);


(lib.Symbol24copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_54();
	this.instance.setTransform(-19.4,-20.7,0.3242,0.3242);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-20.7,38.9,41.5);


(lib.Symbol9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-25,-200,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25,-200,50,400);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-25,-200,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25,-200,50,400);


(lib.Symbol1copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.CachedBmp_51();
	this.instance.setTransform(82.85,-13.2,0.3476,0.3476);

	this.instance_1 = new lib.CachedBmp_50();
	this.instance_1.setTransform(64.8,-1.25,0.3476,0.3476);

	this.instance_2 = new lib.CachedBmp_49();
	this.instance_2.setTransform(60.7,4.85,0.3476,0.3476);

	this.instance_3 = new lib.CachedBmp_48();
	this.instance_3.setTransform(41.15,-0.2,0.3476,0.3476);

	this.instance_4 = new lib.CachedBmp_47();
	this.instance_4.setTransform(33,-4.9,0.3476,0.3476);

	this.instance_5 = new lib.CachedBmp_46();
	this.instance_5.setTransform(13.5,-3.2,0.3476,0.3476);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(13.5,-13.2,74.6,20.5);


(lib.Symbol1copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.CachedBmp_51();
	this.instance.setTransform(82.85,-13.2,0.3476,0.3476);

	this.instance_1 = new lib.CachedBmp_50();
	this.instance_1.setTransform(64.8,-1.25,0.3476,0.3476);

	this.instance_2 = new lib.CachedBmp_49();
	this.instance_2.setTransform(60.7,4.85,0.3476,0.3476);

	this.instance_3 = new lib.CachedBmp_48();
	this.instance_3.setTransform(41.15,-0.2,0.3476,0.3476);

	this.instance_4 = new lib.CachedBmp_47();
	this.instance_4.setTransform(33,-4.9,0.3476,0.3476);

	this.instance_5 = new lib.CachedBmp_46();
	this.instance_5.setTransform(13.5,-3.2,0.3476,0.3476);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(13.5,-13.2,74.6,20.5);


(lib.Symbol1copy2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_14 = new lib.CachedBmp_95();
	this.instance_14.setTransform(159.85,-20.7,0.3476,0.3476);

	this.instance_15 = new lib.CachedBmp_94();
	this.instance_15.setTransform(154.55,-15.15,0.3476,0.3476);

	this.instance_16 = new lib.CachedBmp_93();
	this.instance_16.setTransform(151.7,-8.25,0.3476,0.3476);

	this.instance_17 = new lib.CachedBmp_92();
	this.instance_17.setTransform(141.75,-12.65,0.3476,0.3476);

	this.instance_18 = new lib.CachedBmp_91();
	this.instance_18.setTransform(132.4,-12.65,0.3476,0.3476);

	this.instance_19 = new lib.CachedBmp_90();
	this.instance_19.setTransform(125.05,-16.65,0.3476,0.3476);

	this.instance_20 = new lib.CachedBmp_89();
	this.instance_20.setTransform(119.8,-16.65,0.3476,0.3476);

	this.instance_21 = new lib.CachedBmp_88();
	this.instance_21.setTransform(114.1,-14.8,0.3476,0.3476);

	this.instance_22 = new lib.CachedBmp_93();
	this.instance_22.setTransform(111.25,-8.25,0.3476,0.3476);

	this.instance_23 = new lib.CachedBmp_86();
	this.instance_23.setTransform(101.35,-12.65,0.3476,0.3476);

	this.instance_24 = new lib.CachedBmp_85();
	this.instance_24.setTransform(95.35,-11.55,0.3476,0.3476);

	this.instance_25 = new lib.CachedBmp_84();
	this.instance_25.setTransform(89.1,-11.95,0.3476,0.3476);

	this.instance_26 = new lib.CachedBmp_83();
	this.instance_26.setTransform(86.45,-8.25,0.3476,0.3476);

	this.instance_27 = new lib.CachedBmp_82();
	this.instance_27.setTransform(76.45,-14.3,0.3476,0.3476);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(76.5,-20.7,86.9,20.599999999999998);


(lib.Symbol1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(26));

	// Layer_2
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(0.25,-18.9,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({_off:false},0).wait(6));

	// Layer_5
	this.instance_1 = new lib.CachedBmp_14();
	this.instance_1.setTransform(-50.15,-24.45,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_21();
	this.instance_2.setTransform(-50.65,-24.95,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_22();
	this.instance_3.setTransform(-50.65,-24.95,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_23();
	this.instance_4.setTransform(-50.15,-24.45,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_24();
	this.instance_5.setTransform(-50.65,-24.95,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_25();
	this.instance_6.setTransform(-50.65,-24.95,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_20();
	this.instance_7.setTransform(-50.15,-24.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[]},1).to({state:[{t:this.instance_7}]},14).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50.6,-24.9,128.5,31);


(lib.rid = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(4,-23.85,0.5,0.5);

	this.instance_1 = new lib.whitrglossyrectanglebuttonmd();
	this.instance_1.setTransform(0,-31.65,0.1075,0.1529);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-31.6,32,31.6);


(lib.hijab_alpha = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(0,0,0.3968,0.3968);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hijab_alpha, new cjs.Rectangle(0,0,799.9,450), null);


(lib.chfafsilcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-59.95,-20,0.3026,0.3026);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.chfafsilcopy, new cjs.Rectangle(-59.9,-20,120.1,40), null);


(lib.ci = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ci, new cjs.Rectangle(0,0,74,74), null);


(lib.chafafasfar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.sfrechfqf();
	this.instance.setTransform(-127,-13);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-127,-13,263,25);


(lib.chaf = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(0,0,0.0554,0.0554);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.chaf, new cjs.Rectangle(0,0,169,106), null);


(lib.arow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(-71.35,-41.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arow, new cjs.Rectangle(-71.3,-41.2,141,82), null);


(lib.Symbol37 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.musicOn = new lib.Symbol33();
	this.musicOn.name = "musicOn";
	this.musicOn.setTransform(-1.9,0.15);

	this.timeline.addTween(cjs.Tween.get(this.musicOn).wait(1));

	// Layer_2
	this.musicOff = new lib.Symbol36();
	this.musicOff.name = "musicOff";
	this.musicOff.setTransform(1,0);

	this.timeline.addTween(cjs.Tween.get(this.musicOff).wait(1));

	// Layer_3
	this.instance = new lib.CachedBmp_152();
	this.instance.setTransform(-21.15,-24.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol37, new cjs.Rectangle(-21.1,-24.1,40,43.5), null);


(lib.Symbol32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		var that = this;
		
		that.parent.stopReceivingOnTickSound;
		that.rate = 0;
		
		that.trk.addEventListener("pressup", onpressup);
		that.trk.addEventListener("pressmove", onpressmove.bind(this));
		that.trk.addEventListener("mousedown", onmousedown.bind(this));
		
		var trkWidth = that.trk.getBounds().width;
		var sldWidth = that.sld.getBounds().width;
		
		
		//set hitarea for slider to react to drag 
		
		var rect = new createjs.Shape();
		rect.graphics.beginFill("#ff0000"); //("#f00");
		rect.graphics.drawRect(-10, -10, 70,
			30); //rect.graphics.drawRect(0, 0, 660, 450);
		rect.graphics.endFill();
		
		that.trk.hitArea = rect;
		
		that. totalFrm;
		
		function onmousedown(e) {
		
			e.nativeEvent.preventDefault();
			
			totalFrm = that.parent.mov.totalFrames;
			var pt = this.globalToLocal(e.stageX, e.stageY);
			var posX = pt.x;
			var posY = pt.y;
		
			that.parent.stopReceivingOnTickSound = true;
		
		}
		
		
		function onpressmove(e) {
		
		
			var pt = this.globalToLocal(e.stageX, e.stageY);
		
		
		
			if (pt.x >= 0 && pt.x <= sldWidth) {
		
				var newX = pt.x;
		
		
				that.trk.x = newX;
		
		
				//	alert("that.parent.parent "+that.parent.parent.parent);
		
			}
		}
		
		
		//Mouse UP and SNAP====================
		function onpressup(evt) {
		
		
			trkRate(that.trk.x);
		
			that.parent.mov.gotoAndPlay(that.totalFrm * that.rate);
		
			that.parent.parent.resetSoundPosition(that.rate);
		
			//we change this variable after setting the new sound position 
			//to start updating the trk position on tick function from sound
		
			that.parent.stopReceivingOnTickSound = false;
		}
		
		
		function trkRate(currentPosition) {
		
			var cur = currentPosition < 0 ? 0 : currentPosition > sldWidth ? sldWidth : currentPosition;
			that.rate = cur / sldWidth;
			
			
			return that.rate;
		}
		
		that.resetTrk = function (rate ,totalFrm ) {
		
			that.totalFrm = totalFrm ;
			if (!that.parent.stopReceivingOnTickSound) {
		
				that.trk.x = sldWidth * rate;
				that.rate = rate;
				
					that.parent.mov.gotoAndPlay(that.totalFrm * that.rate);
				}
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// trk
	this.trk = new lib.Symbol30();
	this.trk.name = "trk";
	this.trk.setTransform(-0.75,0);

	this.timeline.addTween(cjs.Tween.get(this.trk).wait(1));

	// sld
	this.sld = new lib.Symbol29();
	this.sld.name = "sld";
	this.sld.setTransform(-0.25,0);

	this.timeline.addTween(cjs.Tween.get(this.sld).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol32, new cjs.Rectangle(-6.2,-14.5,231,29), null);


(lib.Symbol27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_19 = function() {
		this.gotoAndPlay(1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(1));

	// Layer_1
	this.instance = new lib.Symbol31("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.7021,scaleY:1.7544},9).to({scaleX:1,scaleY:1},10).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-19.9,40.3,40);


(lib.shap_hjb = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		var that = this;
		function add_remove(sclX, sclY, type) {
		
		
			if (type === "circle") {
		
				that.sq.visible = false;
				
			} else if (type === "square") {
		
				that.ci.visible = false;
			}
			var rm_shape = new lib.rem_shape();
		
			//rm_shape.x = 15;
			//rm_shape.y = 15;
		
			rm_shape.scaleX = 1 / sclX;
			rm_shape.scaleY = 1 / sclY;
		
			that.addChild(rm_shape);
		
			rm_shape.addEventListener("click", toRemove_shape);
		
			function toRemove_shape() {
		
		
				rm_shape.removeEventListener("click", toRemove_shape);
		
				that.parent.removeChild(that);
			}
		
		}
		
		that.add_remove = add_remove;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_2
	this.ci = new lib.ci();
	this.ci.name = "ci";
	this.ci.setTransform(0,0,1,1,0,0,0,37,37);

	this.timeline.addTween(cjs.Tween.get(this.ci).wait(1));

	// Layer_4
	this.sq = new lib.sq();
	this.sq.name = "sq";
	this.sq.setTransform(37,37,1,1,0,0,0,37,37);

	this.timeline.addTween(cjs.Tween.get(this.sq).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shap_hjb, new cjs.Rectangle(-37,-37,111,111), null);


(lib.return_btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// Layer_1
	this.instance = new lib.mokabir("synched",0);
	this.instance.setTransform(9.05,9,0.1209,0.107,0,0,0,74.9,84.2);

	this.instance_1 = new lib.Symbol34_1("synched",0);
	this.instance_1.setTransform(9.6,4.95,1.777,1.8558);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-5,18.3,23.2);


(lib.rem_shape = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol34("synched",0);
	this.instance.setTransform(-0.15,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.rem_shape, new cjs.Rectangle(-5.3,-5.7,10,10), null);


(lib.PAGEloaDER = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_36 = function() {
		this.gotoAndPlay(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(36).call(this.frame_36).wait(1));

	// Layer_4
	this.instance = new lib.prebleu("synched",0);
	this.instance.setTransform(0.3,-0.1,0.3435,0.2802,0,0,0,0.3,-0.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(5).to({regX:0.1,regY:-0.4,scaleX:0.3134,scaleY:0.3134,skewX:50.7973,skewY:39.2027,y:-0.15},0).wait(5).to({regX:-0.2,regY:-0.1,scaleX:0.2802,scaleY:0.3434,rotation:90,skewX:0,skewY:0,y:-0.1},0).wait(5).to({regX:-0.4,scaleX:0.3134,scaleY:0.3134,rotation:0,skewX:129.1983,skewY:140.7938,x:0.35,y:-0.15},0).wait(5).to({regX:-0.3,regY:0,scaleX:0.3434,scaleY:0.2801,rotation:180,skewX:0,skewY:0,y:-0.1},0).wait(5).to({regX:0,scaleX:0.2801,scaleY:0.3434,rotation:270},0).wait(5).to({startPosition:0},0).wait(6));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_99();
	this.instance_1.setTransform(-394,-231,0.3899,0.3899);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(37));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-394,-231,788,462.1);


(lib.cswsouf1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(456));

	// Layer_13
	this.instance = new lib.chafafasfar("synched",0);
	this.instance.setTransform(79.7,341.25,0.184,1.2687,0,0,0,-130.7,0.3);
	this.instance.alpha = 0.5781;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(439).to({_off:false},0).to({_off:true},13).wait(4));

	// Layer_12
	this.instance_1 = new lib.chafafasfar("synched",0);
	this.instance_1.setTransform(187.7,338.85,0.184,1.2687,0,0,0,-130.7,0.3);
	this.instance_1.alpha = 0.5781;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(408).to({_off:false},0).to({_off:true},20).wait(28));

	// Layer_11
	this.instance_2 = new lib.chafafasfar("synched",0);
	this.instance_2.setTransform(350,342.15,0.4233,1.2687,0,0,0,-130.8,0.4);
	this.instance_2.alpha = 0.5781;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(361).to({_off:false},0).to({_off:true},33).wait(62));

	// Layer_10
	this.instance_3 = new lib.chafafasfar("synched",0);
	this.instance_3.setTransform(522.8,341.35,0.464,1.2687,0,0,0,-130.8,0.4);
	this.instance_3.alpha = 0.5781;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(311).to({_off:false},0).to({_off:true},34).wait(111));

	// Layer_9
	this.instance_4 = new lib.chafafasfar("synched",0);
	this.instance_4.setTransform(79.7,261.45,0.184,1.2687,0,0,0,-130.7,0.3);
	this.instance_4.alpha = 0.5781;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(274).to({_off:false},0).to({_off:true},20).wait(162));

	// Layer_8
	this.instance_5 = new lib.chafafasfar("synched",0);
	this.instance_5.setTransform(173.75,259.9,0.184,1.2687,0,0,0,-130.7,0.4);
	this.instance_5.alpha = 0.5781;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(246).to({_off:false},0).to({_off:true},16).wait(194));

	// Layer_7
	this.instance_6 = new lib.chafafasfar("synched",0);
	this.instance_6.setTransform(376.95,261.45,0.3138,1.2687,0,0,0,-130.9,0.3);
	this.instance_6.alpha = 0.5781;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(206).to({_off:false},0).to({_off:true},27).wait(223));

	// Layer_6
	this.instance_7 = new lib.chafafasfar("synched",0);
	this.instance_7.setTransform(554.2,261.45,0.3138,1.2687,0,0,0,-130.8,0.3);
	this.instance_7.alpha = 0.5781;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(165).to({_off:false},0).to({_off:true},29).wait(262));

	// Layer_5
	this.instance_8 = new lib.chafafasfar("synched",0);
	this.instance_8.setTransform(176.05,193.65,0.4523,1.2687,0,0,0,-130.8,0.4);
	this.instance_8.alpha = 0.5781;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(105).to({_off:false},0).to({_off:true},33).wait(318));

	// Layer_4
	this.instance_9 = new lib.chafafasfar("synched",0);
	this.instance_9.setTransform(459.5,194.5,0.3138,1.2687,0,0,0,-130.8,0.3);
	this.instance_9.alpha = 0.5781;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(76).to({_off:false},0).to({_off:true},22).wait(358));

	// Layer_14
	this.instance_10 = new lib.chafafasfar("synched",0);
	this.instance_10.setTransform(108.05,102.15,0.4603,1.2687,0,0,0,-131,0.3);
	this.instance_10.alpha = 0.5781;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(29).to({_off:false},0).to({_off:true},33).wait(394));

	// Layer_20
	this.instance_11 = new lib.chafafasfar("synched",0);
	this.instance_11.setTransform(234.1,102.15,0.3104,1.2687,0,0,0,-130.8,0.3);
	this.instance_11.alpha = 0.5781;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({_off:true},24).wait(432));

	// Layer_2
	this.instance_12 = new lib.Bitmap15();
	this.instance_12.setTransform(0,0,0.5422,0.4033);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(456));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,672.9,375.9);


(lib.akmil = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_19 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(19).call(this.frame_19).wait(1));

	// Layer_1
	this.instance = new lib.Symbol1copy2("synched",0);
	this.instance.setTransform(115.55,6.5,0.0434,1,0,0,0,161.3,-8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:156.8,regY:-8.1,scaleX:1.0287,scaleY:1.4383,x:74,y:10.4},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.6,-7.7,124.19999999999999,29.599999999999998);


(lib.yad = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.arow();
	this.instance.setTransform(29.95,28.8,0.2417,0.405,0,0,0,0,0.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:21.95},8).to({x:29.95},8).wait(1));

	// Layer_3
	this.instance_1 = new lib.Group();
	this.instance_1.setTransform(0.9,-2.3,2.6648,2.442);

	this.instance_2 = new lib.Path();
	this.instance_2.setTransform(6.75,-2.3,2.6648,2.442);

	this.instance_3 = new lib.Path_1();
	this.instance_3.setTransform(5.8,42.4,2.6648,2.442);

	this.instance_4 = new lib.CachedBmp_80();
	this.instance_4.setTransform(-1.2,0.65,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_79();
	this.instance_5.setTransform(-1.5,0.4,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_78();
	this.instance_6.setTransform(-2,1.5,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_77();
	this.instance_7.setTransform(-2,1.5,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_76();
	this.instance_8.setTransform(-2.55,3.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).wait(17));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-2.3,64.7,60.8);


(lib.Symbol33_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		//var that = this ;
		//that.listeners_are_added = false;
		
		//if( ! that.listeners_are_added) {that.addEventListener("click", sitar);
		//	that.listeners_are_added = true;}
		//var sitar_is_clicked = false ;
		
		//function sitar(evt) {
		
		//	sitar_is_clicked = !sitar_is_clicked;
		//	if (sitar_is_clicked) {
		//		that.gotoAndStop(1);
		
		//	} else {
		//		that.gotoAndStop(0);
		//	}
		
		//}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_56();
	this.instance_1.setTransform(-10.1,-11,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},1).wait(1));

	// Layer_3
	this.instance_2 = new lib.rid("synched",0);
	this.instance_2.setTransform(-0.05,-0.55,0.65,0.7127,0,0,0,16,-15.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.4,-12.2,20.700000000000003,22.6);


(lib.Symbol26copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_19 = function() {
		this.gotoAndPlay(1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(1));

	// Layer_1
	this.instance = new lib.Symbol30_1("synched",0);
	this.instance.filters = [new cjs.ColorFilter(0.5, 0.5, 0.5, 1, 113.5, 2.5, 9.5, 0)];
	this.instance.cache(-14,-13,28,27);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.7021,scaleY:1.7544,y:-5},9).to({scaleX:1,scaleY:1,y:0},10).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-24.9,40.099999999999994,39.9);


(lib.Symbol23_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_19 = function() {
		this.gotoAndPlay(1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(1));

	// Layer_1
	this.instance_1 = new lib.Symbol24copy("synched",0);
	this.instance_1.filters = [new cjs.ColorFilter(0.5, 0.5, 0.5, 1, 82.5, 100, 15.5, 0)];
	this.instance_1.cache(-21,-23,43,46);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:1.5424,scaleY:1.4458,y:-4.5},9).to({scaleX:1,scaleY:1,y:0},10).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.9,-34.4,60,60);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
		
		var that = this;
		
		that.is_scaled;
		
		//that.rtrn.setBounds(0,0,2,2);
		
		
		if ( !that.is_scaled) {
			var new_rtrn = new lib.return_btn();
		
			that.new_rtrn = new_rtrn;
		
			new_rtrn.x = that.rtrn.x;
			new_rtrn.y = that.rtrn.y;
		
			that.addChild(new_rtrn);
		
			//alert('that.getBounds().width' + that.getBounds().width);
			//alert('that.getTransformedBounds().height' + that.getTransformedBounds().height);
		
			new_rtrn.scaleX  = 2 *  that.getBounds().width / that.getTransformedBounds().width;
			new_rtrn.scaleY =  2 * that.getBounds().height /that.getTransformedBounds().height;
			
			that.is_scaled = true;
		
		}
		
		
		
		this.new_rtrn.addEventListener("click", fl_MouseClickHandler_9);
		
		function fl_MouseClickHandler_9(e) {
		
			if (e.nativeEvent instanceof MouseEvent) {
				console.log('new_rtrn clicked');
			if (!that.parent.isclicked) return;
			
			//that.new_rtrn.removeEventListener("click", fl_MouseClickHandler_9);
		
			e.stopImmediatePropagation();
		
			//alert("Mouse clicked rtrn ");
		
			that.new_rtrn.gotoAndStop(0);
		
			that.kadrzoom.alpha = 1 ;
		
			that.parent.parent.toreset();
		
			that.parent.parent.startDrag();
		
			that.parent.parent.mask = null;
		
			exportRoot.tool_enable(true , 'zoom');
			
			that.parent.isclicked = false;
		}
	}
	}
	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_4
	this.rtrn = new lib.place_zm();
	this.rtrn.name = "rtrn";
	this.rtrn.setTransform(119.3,9.1,0.28,0.28);
	this.rtrn.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.rtrn).wait(1));

	// kadr
	this.kadrzoom = new lib.kardrzoom();
	this.kadrzoom.name = "kadrzoom";
	this.kadrzoom.setTransform(65.2,35.45);

	this.timeline.addTween(cjs.Tween.get(this.kadrzoom).wait(1));

	// chafaf
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(0.9,1.35,0.0406,0.0406);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-0.4,-0.4,131.4,71.9), null);


(lib.replaycopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol349copy("synched",0);
	this.instance.setTransform(-22,-30.65,0.1342,0.1366,0,0,0,-164,-172);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.replaycopy, new cjs.Rectangle(-21.9,-1.7,44,47), null);


(lib.replay = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol349("synched",0);
	this.instance.setTransform(-22,-30.65,0.1342,0.1366,0,0,0,-164,-172);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.replay, new cjs.Rectangle(-21.9,-1.7,44,47), null);


(lib.akmilcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_19 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(19).call(this.frame_19).wait(1));

	// Layer 1
	this.instance = new lib.Symbol1copy3("synched",0);
	this.instance.setTransform(28.2,-46.9,0.0434,1,0,0,0,93.4,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:93.3,scaleX:1.0287,scaleY:1.4383,x:83.2},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.1,-65.8,76.7,29.299999999999997);


(lib.akmil_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_19 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(19).call(this.frame_19).wait(1));

	// Layer_1
	this.instance_1 = new lib.Symbol1copy2_1("synched",0);
	this.instance_1.setTransform(115.55,6.5,0.0434,1,0,0,0,161.3,-8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:156.8,regY:-8.1,scaleX:1.0287,scaleY:1.4383,x:74,y:10.4},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.6,-7.7,124.19999999999999,29.599999999999998);


(lib.addil = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.Symbol9("synched",0);
	this.instance.setTransform(37,200);

	this.instance_1 = new lib.Symbol7("synched",0);
	this.instance_1.setTransform(-13,200);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.addil, new cjs.Rectangle(-38,0,100,400), null);


(lib.chafaf = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		var that = this;
		
		//to controle if a 'zome mc' is clicked
		that.isclicked;
		
		that.listofcs = [];
		
		
		
		
		
		
		
		var prev_list = [];
		
		function addYad_by_frame(arr) {
		
			for (var u = 0; u < arr.length; u++) {
		
				if (arr[u].name.slice(0, 2) == 'zm') continue;
				var yad = new lib.yad();
		
				that.addChild(yad);
				yad.x = arr[u].x;
				yad.y = arr[u].y;
		
				prev_list.push(yad);
		
		
			}
		
		}
		that.addYad_by_frame = addYad_by_frame;
		
		function removeYad_by_frame() {
		
			for (var u = 0; u < prev_list.length; u++) {
		
				that.removeChild(prev_list[u]);
		
			}
			prev_list = [];
		}
		that.removeYad_by_frame = removeYad_by_frame;
		
		
		
		
		function zomhandle(e) {
			
		console.log("zomhandle(e) clicked");
			console.log("zomhandle(e) event" , e);
			
		
			//if (  e.nativeEvent instanceof MouseEvent){
			
		
			if (that.isclicked || that.parent.isDragged) return;
		
		
		
			// reset dimensions before calculate x and y ;
			that.parent.toreset();
			//e.currentTarget.kadrzoom.alpha = 0;
		
			var pt = that.localToGlobal(e.currentTarget.x + (e.currentTarget.getTransformedBounds().width) / 2,
				e.currentTarget.y + (e.currentTarget.getTransformedBounds().height) / 2);
		
			var contRegxy = that.parent.globalToLocal(pt.x, pt.y);
		
		
			console.log(" pt.x " + pt.x);
		
		
		
			that.isclicked = true;
		
		
		
			that.parent.regX = contRegxy.x;
			that.parent.regY = contRegxy.y;
		
			that.parent.stopDrag();
		
				
			that.parent.parent.tool_enable(false, 'zoom');
			e.currentTarget.new_rtrn.gotoAndStop(1);
			that.parent.parent.parentScale(e.currentTarget);
		
			
			
				
		//}
		}
		
		this.zomhandle = zomhandle;
	}
	this.frame_7 = function() {
		this.listofcs = [this. cswsouf1,this.cswssil4_19,this.cswtext1_13,this.zm1 ,this.zm2];
	}
	this.frame_8 = function() {
		this.listofcs = [this.cswtext1_19 ,this.cswcolo1_16 ];
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(7).call(this.frame_7).wait(1).call(this.frame_8).wait(7));

	// Layer_4
	this.zm2 = new lib.Symbol3();
	this.zm2.name = "zm2";
	this.zm2.setTransform(288.65,173.55,3.965,12.327,0,0,0,0.1,0.4);

	this.zm1 = new lib.Symbol3();
	this.zm1.name = "zm1";
	this.zm1.setTransform(1266.75,1116.1,7.6765,6.308,0,0,0,0.1,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.zm1},{t:this.zm2}]},7).to({state:[]},1).wait(7));

	// Layer_3
	this.cswtext1_13 = new lib.chaf();
	this.cswtext1_13.name = "cswtext1_13";
	this.cswtext1_13.setTransform(1147.6,1394.95,6.3821,5.7169,0,0,0,169,53.1);

	this.cswssil4_19 = new lib.chaf();
	this.cswssil4_19.name = "cswssil4_19";
	this.cswssil4_19.setTransform(1147.6,805.95,6.3821,3.6267,0,0,0,169,53.1);

	this.cswsouf1 = new lib.chaf();
	this.cswsouf1.name = "cswsouf1";
	this.cswsouf1.setTransform(2276.3,717.8,6.3821,7.0584,0,0,0,169.1,53.1);

	this.cswtext1_19 = new lib.chaf();
	this.cswtext1_19.name = "cswtext1_19";
	this.cswtext1_19.setTransform(1021.7,365.25,6.4715,3.7173,0,0,0,169,53.5);

	this.cswcolo1_16 = new lib.chaf();
	this.cswcolo1_16.name = "cswcolo1_16";
	this.cswcolo1_16.setTransform(2185.9,1116.1,6.2628,9.0223,0,0,0,169,53);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.cswsouf1},{t:this.cswssil4_19},{t:this.cswtext1_13}]},7).to({state:[{t:this.cswcolo1_16},{t:this.cswtext1_19}]},1).to({state:[]},1).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72,0,2347.4,1697.4);


(lib.bkg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// Layer_1
	this.instance = new lib.Symbol10("synched",0);
	this.instance.setTransform(0.05,0.15,0.7166,0.6529,0,0,0,0.1,0.2);

	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(-17.7,-16.9,0.3095,0.3095);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.7,-16.9,35.3,33.8);


(lib.waraq = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol31_1("synched",0);
	this.instance.setTransform(319.15,214.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.waraq, new cjs.Rectangle(0,0,638.5,428.5), null);


(lib.akmilcopy_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_19 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(19).call(this.frame_19).wait(1));

	// Layer 1
	this.instance_1 = new lib.Symbol1copy4("synched",0);
	this.instance_1.setTransform(28.2,-46.9,0.0434,1,0,0,0,93.4,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:93.3,scaleX:1.0287,scaleY:1.4383,x:83.2},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.1,-65.8,76.7,29.299999999999997);


(lib.tool_btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_155();
	this.instance.setTransform(-9,1.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_154();
	this.instance_1.setTransform(-1.7,-13.05,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_153();
	this.instance_2.setTransform(-16.1,-14.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-0.3,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tool_btn, new cjs.Rectangle(-16.1,-15.2,32.5,29.6), null);


(lib.Symbol38 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ply_btn
	this.musicBtn = new lib.Symbol37();
	this.musicBtn.name = "musicBtn";
	this.musicBtn.setTransform(-118.3,2.5,0.8582,0.793);

	this.timeline.addTween(cjs.Tween.get(this.musicBtn).wait(1));

	// sldr
	this.cursor = new lib.Symbol32();
	this.cursor.name = "cursor";
	this.cursor.setTransform(-88.3,3.2,1,1,0,0,0,0.8,0);

	this.timeline.addTween(cjs.Tween.get(this.cursor).wait(1));

	// Layer_3
	this.instance = new lib.rectongle("synched",0);
	this.instance.setTransform(-131.2,1.4,1.9808,1.1063,0,0,0,-94.4,-4.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol38, new cjs.Rectangle(-136.4,-18.9,283.8,40.5), null);


(lib.Symbol15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		
		
		var that = this;
		var qalamisclicked = false;
		that.firsTime;
		this.addEventListener("click", choose);
		
		function choose(evt) {
			if (evt.nativeEvent instanceof MouseEvent) {
		
		        if(that.parent.isdraged) return ;
				
				console.log('qalamisclicked' , qalamisclicked);
				qalamisclicked = !qalamisclicked;
				if (qalamisclicked) {
					 
					var frm = that.parent.parent.isLeft ? 7 : 8 ;
					if( ! that.firsTime && frm == 8 ){
						
						evt.currentTarget.gotoAndPlay(7);
						
						}
					else evt.currentTarget.gotoAndStop(frm);
				} else {
					evt.currentTarget.gotoAndStop(that.parent.currentcolor);
		
				} // that .removeEventListener("click" , choose);
		
			}
		
		
		}
		
		function reset(){
			
			qalamisclicked = false ;
			that.gotoAndStop(that.parent.currentcolor);
		
			
		}
		that.reset = reset ;
	}
	this.frame_7 = function() {
		this.stop();
		
		var that = this;
		var list_frame = {
			'aswad': {
				'frame': 1,
				'color': "#000000"
			},
			'ahmar': {
				'frame': 3,
				'color': "#ff0000"
			},
			'azrak': {
				'frame': 2,
				'color': "#0000ff"
			},
			'asfar': {
				'frame': 4,
				'color': "#ffff00"
			},
			'akhdar': {
				'frame': 5,
				'color': "#008000"
			},
			'purple': {
				'frame': 6,
				'color': "#8a2be2"
			},
		
		}
		
		if (!that.firsTime) {
		
			console.log("that.add firsTime the lstnr");
			that.aswad.addEventListener("click", qlm_loun);
			that.ahmar.addEventListener("click", qlm_loun);
			that.asfar.addEventListener("click", qlm_loun);
			that.akhdar.addEventListener("click", qlm_loun);
			that.azrak.addEventListener("click", qlm_loun);
			that.purple.addEventListener("click", qlm_loun);
		
			that.firsTime = true;
		}
		
		
		function qlm_loun(evt) {
		
			evt.stopImmediatePropagation();
			obj = list_frame[evt.currentTarget.name];
			
			evt.currentTarget.parent.gotoAndStop(obj['frame']);
		
			that.parent.color = obj['color'];
		
			that.parent.currentcolor = obj['frame'];
		
		}
	}
	this.frame_8 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(7).call(this.frame_7).wait(1).call(this.frame_8).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_134();
	this.instance.setTransform(-13.25,-13.15,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_127();
	this.instance_1.setTransform(-13.25,-13.15,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_128();
	this.instance_2.setTransform(-13.25,-13.15,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_129();
	this.instance_3.setTransform(-13.25,-13.15,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_130();
	this.instance_4.setTransform(-13.25,-13.15,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_131();
	this.instance_5.setTransform(-13.25,-13.15,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_132();
	this.instance_6.setTransform(-13.25,-13.15,0.5,0.5);

	this.azrak = new lib.Symbol21();
	this.azrak.name = "azrak";
	this.azrak.setTransform(56.3,-36);

	this.ahmar = new lib.Symbol20();
	this.ahmar.name = "ahmar";
	this.ahmar.setTransform(26.6,-36);

	this.aswad = new lib.Symbol19();
	this.aswad.name = "aswad";
	this.aswad.setTransform(-3.2,-36);
	this.aswad.filters = [new cjs.ColorFilter(0, 0, 0, 1, 0, 0, 0, 0)];
	this.aswad.cache(-14,-15,28,30);

	this.purple = new lib.Symbol18();
	this.purple.name = "purple";
	this.purple.setTransform(56.3,-67.55);

	this.asfar = new lib.Symbol17();
	this.asfar.name = "asfar";
	this.asfar.setTransform(26.6,-67.55);

	this.akhdar = new lib.Symbol16();
	this.akhdar.name = "akhdar";
	this.akhdar.setTransform(-3.2,-67.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance},{t:this.akhdar,p:{skewX:0,y:-67.55}},{t:this.asfar,p:{skewX:0,y:-67.55}},{t:this.purple,p:{skewX:0,y:-67.55}},{t:this.aswad,p:{skewX:0,y:-36}},{t:this.ahmar,p:{skewX:0,y:-36}},{t:this.azrak,p:{skewX:0,y:-36}}]},1).to({state:[{t:this.instance},{t:this.akhdar,p:{skewX:180,y:63.55}},{t:this.asfar,p:{skewX:180,y:63.55}},{t:this.purple,p:{skewX:180,y:63.55}},{t:this.aswad,p:{skewX:180,y:32}},{t:this.ahmar,p:{skewX:180,y:32}},{t:this.azrak,p:{skewX:180,y:32}}]},1).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(1.35,0.05);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.2,-80.5,83.5,157.1);


(lib.Symbol14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		var that = this ;
		that.listeners_are_added = false;
		
		that.addEventListener("click", chosSomk);
		var somk_is_clicked = false ;
		
		function chosSomk(evt) {
		
			if (evt.nativeEvent instanceof MouseEvent) {
		
					 if(that.parent.isdraged) return ;
					
			somk_is_clicked = !somk_is_clicked;
			if (somk_is_clicked) {
				var frm = that.parent.parent.isLeft ? 4 : 5 ;
				
				if( ! that.listeners_are_added && frm == 5 ){
						
						evt.currentTarget.gotoAndPlay(4);
						
						}
				that.gotoAndStop(frm);
				
		
			} else {
				that.gotoAndStop(that.parent.currentsomk);
			}
		}
		}
		function reset(){
			
			somk_is_clicked = false ;
			that.gotoAndStop(that.parent.currentsomk);
		
			
		}
		that.reset = reset ;
	}
	this.frame_4 = function() {
		var that = this ;
		
		if( ! that.listeners_are_added){
			
			that.mysaghir.addEventListener("click", tosaghir);
			that.myawsat.addEventListener("click", toawsat);
			that.mykabir.addEventListener("click", tokabir);
		
			 that.listeners_are_added = true;
		}
		
		
		function tosaghir(evt) {
		
			evt.stopImmediatePropagation();
			
			that.gotoAndStop(1);
			
			that.parent.somk =1;
			
			that.parent.currentsomk = 1 ;
		   
		
		}
		
		function toawsat(evt) {
		
			//alert("from somk frame 5 awsat");
			evt.stopImmediatePropagation();
			
			that.gotoAndStop(2);
			
			that.parent.somk =3;
		   
			that.parent.currentsomk = 2;
		  
		
		}
		
		
		function tokabir(evt) {
		
			evt.stopImmediatePropagation();
			
			that.gotoAndStop(3);
			
			that.parent.somk =6;
		   
		    that.parent.currentsomk = 3;
		}
	}
	this.frame_5 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_125();
	this.instance.setTransform(-13.2,-8.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_121();
	this.instance_1.setTransform(-13.2,-8.2,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_122();
	this.instance_2.setTransform(-13.2,-8.2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_123();
	this.instance_3.setTransform(-13.2,-8.2,0.5,0.5);

	this.mysaghir = new lib.Symbol24();
	this.mysaghir.name = "mysaghir";
	this.mysaghir.setTransform(0.85,-27.65,1,1,-90);

	this.myawsat = new lib.Symbol23();
	this.myawsat.name = "myawsat";
	this.myawsat.setTransform(0.95,-55.1,1,1,-90);

	this.mykabir = new lib.Symbol22();
	this.mykabir.name = "mykabir";
	this.mykabir.setTransform(0.8,-84.95,1,1,-90);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance},{t:this.mykabir,p:{rotation:-90,skewX:0,skewY:0,y:-84.95}},{t:this.myawsat,p:{rotation:-90,skewX:0,skewY:0,y:-55.1}},{t:this.mysaghir,p:{rotation:-90,skewX:0,skewY:0,y:-27.65}}]},1).to({state:[{t:this.instance},{t:this.mykabir,p:{rotation:0,skewX:-90,skewY:90,y:85.35}},{t:this.myawsat,p:{rotation:0,skewX:-90,skewY:90,y:55.5}},{t:this.mysaghir,p:{rotation:0,skewX:-90,skewY:90,y:28.05}}]},1).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-0.3,0.2);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.7,-93.3,31.2,187);


(lib.Symbol13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		var that = this;
		that.isadded ;
		var mimsaha_isclicked = false;
		//we double the somk value if we activate the erase function.so we have to divide it again.
		
		
		that.addEventListener("click", toMimsaha);
		
		function toMimsaha(evt) {
			if (evt.nativeEvent instanceof MouseEvent) {
		
		        	 if(that.parent.isdraged) return ;
					
				mimsaha_isclicked = !mimsaha_isclicked;
				if (mimsaha_isclicked) {
					var frm = that.parent.parent.isLeft ? 3 : 4 ;
					if( ! that.isadded && frm == 4 ){
						
						evt.currentTarget.gotoAndPlay(3);
						
						}
					else that.gotoAndStop(frm);
					
				} else {
					that.gotoAndStop(1);
				}
			}
		}
		function reset(){
			
			mimsaha_isclicked = false ;
			that.gotoAndStop(1);
		
			
		}
		that.reset = reset ;
	}
	this.frame_3 = function() {
		var that = this;
		
		that.isadded;
		
		if (!that.isadded) {
		
			that.myerase.addEventListener("click", toerase);
			that.myAll.addEventListener("click", toAll);
		
			that.isadded = true;
		}
		
		
		
		function toerase(evt) {
		
			evt.stopImmediatePropagation();
		
			//that.myerase.removeEventListener("click", toerase);
		
			that.parent.isErase = true;
		
			that.gotoAndStop(1);
		
		
		}
		
		
		
		function toAll(evt) {
		
			evt.stopImmediatePropagation();
		
			var sbr_shape = that.parent.parent.getCont().getChildByName("sbr").getChildByName('shapeDraw');
		
			sbr_shape.graphics.clear();
			sbr_shape.updateCache();
		
			var f_sbr_shape = that.parent.parent.getCont().getChildByName("sbr").getChildByName('f_shapeDraw');
		
			f_sbr_shape.graphics.clear();
			f_sbr_shape.updateCache();
		
			that.parent.isErase = false;
		
			that.parent.parent.kom(evt);
		}
	}
	this.frame_4 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3).call(this.frame_3).wait(1).call(this.frame_4).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_119();
	this.instance.setTransform(-14.15,-13.15,0.5,0.5);

	this.myAll = new lib.Symbol26();
	this.myAll.name = "myAll";
	this.myAll.setTransform(14.35,-32.85);

	this.myerase = new lib.Symbol25();
	this.myerase.name = "myerase";
	this.myerase.setTransform(-16.35,-34.35,0.9333,0.9444,29.9991);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.myerase,p:{y:-34.35}},{t:this.myAll,p:{y:-32.85}}]},3).to({state:[{t:this.instance},{t:this.myerase,p:{y:31.65}},{t:this.myAll,p:{y:33.15}}]},1).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-2.7,0.3);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28,-48,51.7,93.4);


(lib.Symbol12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_116();
	this.instance.setTransform(-12.75,-13.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(0.2,0.2);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol12, new cjs.Rectangle(-15.2,-14.8,31.2,29.6), null);


(lib.Symbol11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_115();
	this.instance.setTransform(-11.9,-12.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-0.8,0);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(-16.2,-15,31.2,29.6), null);


(lib.Symbol7_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.CachedBmp_113();
	this.instance_1.setTransform(-13.25,-12.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-0.3,0.8);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol7_1, new cjs.Rectangle(-15.7,-14.2,31.2,29.6), null);


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.re_set = new lib.Symbol28();
	this.re_set.name = "re_set";
	this.re_set.setTransform(-1.3,3.75);

	this.timeline.addTween(cjs.Tween.get(this.re_set).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-1.55,4.3);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(-17,-10.7,31.3,29.599999999999998), null);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_112();
	this.instance.setTransform(-13.2,-13.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-0.3,1.7);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-15.7,-13.3,31.2,29.6), null);


(lib.Symbol3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.CachedBmp_111();
	this.instance_1.setTransform(-13.15,-13.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-1.4,-0.8);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3_1, new cjs.Rectangle(-16.8,-15.8,31.200000000000003,29.6), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_110();
	this.instance.setTransform(-13.2,-17.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_109();
	this.instance_1.setTransform(-6.6,-11.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-1.1,-4.35);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(-16.5,-19.3,31.2,29.6), null);


(lib.settin_btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_107();
	this.instance.setTransform(-12.65,7.45,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_107();
	this.instance_1.setTransform(-12.65,-11.55,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_107();
	this.instance_2.setTransform(-12.65,-2.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-0.3,0.8);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.settin_btn, new cjs.Rectangle(-15.7,-14.2,31.2,29.6), null);


(lib.re_menu = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// Layer_2
	this.instance = new lib.CachedBmp_101();
	this.instance.setTransform(-5.25,-13.35,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_102();
	this.instance_1.setTransform(-8.75,-13.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},1).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(4.7,0.4);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.7,-14.6,31.2,29.6);


(lib.pageavant = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_98();
	this.instance.setTransform(-4.1,-7.2,0.3095,0.3095);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-0.3,0.8);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pageavant, new cjs.Rectangle(-15.7,-14.2,31.2,29.6), null);


(lib.pageapre = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_98();
	this.instance.setTransform(-4.1,-7.2,0.3095,0.3095);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-0.3,0.8);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pageapre, new cjs.Rectangle(-15.7,-14.2,31.2,29.6), null);


(lib.hijabTmrn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		var that = this;
		var clicked = false;
		
		
		that.hijab_alpha.alpha = 1;
		that.listeners_are_added ;
		
		if (!that.listeners_are_added) {
			that.add_alpha.addEventListener("click", addalfa);
			that.listeners_are_added = true;
			
		}
		
		
		
		function addalfa(ev) {
		
			if (ev.nativeEvent instanceof MouseEvent) {
		
				clicked = !clicked;
		
				if (clicked) {
		
					that.hijab_alpha.alpha = 0;
					that.add_alpha.gotoAndStop(1);
		
		
				} else {
					that.hijab_alpha.alpha = 1;
					that.add_alpha.gotoAndStop(0);
		
				}
			}
		
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_2
	this.add_alpha = new lib.Symbol33_1();
	this.add_alpha.name = "add_alpha";
	this.add_alpha.setTransform(778.05,25.05);

	this.timeline.addTween(cjs.Tween.get(this.add_alpha).wait(1));

	// Layer_1
	this.hijab_alpha = new lib.hijab_alpha();
	this.hijab_alpha.name = "hijab_alpha";
	this.hijab_alpha.setTransform(503.8,249.25,1.2601,1.1083,0,0,0,399.8,224.9);

	this.timeline.addTween(cjs.Tween.get(this.hijab_alpha).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hijabTmrn, new cjs.Rectangle(0,0,1008,498.7), null);


(lib.fullscr = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_74();
	this.instance.setTransform(3.7,-12.3,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_73();
	this.instance_1.setTransform(-12.8,3.55,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_72();
	this.instance_2.setTransform(-12.8,-12.3,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_71();
	this.instance_3.setTransform(3.7,3.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(0.3,-0.25);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.1,-15.2,31.200000000000003,29.6);


(lib.feutre = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		
		
		var that = this;
		var feutreisclicked = false;
		that.firsTime;
		that.addEventListener("click", choose_ft);
		
		function choose_ft(evt) {
		
			if (evt.nativeEvent instanceof MouseEvent) {
		
					 if(that.parent.isdraged) return ;
				    
				feutreisclicked = !feutreisclicked;
				if (feutreisclicked) { 
					
					var frm = that.parent.parent.isLeft ? 7 : 8 ;
					
					if( ! that.firsTime && frm == 8 ){
						
						evt.currentTarget.gotoAndPlay(7);
						
						}
					
					else evt.currentTarget.gotoAndStop(frm);
					
					
				} else {
					evt.currentTarget.gotoAndStop(that.parent.current_f_color);
		
				} // that .removeEventListener("click" , choose);
			}
		}
		
		function reset() {
		
			feutreisclicked = false;
			that.gotoAndStop(that.parent.current_f_color);
		
		
		}
		that.reset = reset;
	}
	this.frame_7 = function() {
		this.stop();
		
		var that = this;
		
		if (!that.firsTime) {
		
			that.orange.addEventListener("click", feu_loun);
			that.ahmar.addEventListener("click", feu_loun);
			that.akhdar.addEventListener("click", feu_loun);
			that.azrak.addEventListener("click", feu_loun);
			that.asfar.addEventListener("click", feu_loun);
			that.purple.addEventListener("click", feu_loun);
			that.firsTime = true;
		}
		var list_frame = {
			'orange': {
				'frame': 2,
				'color': "#ff8c00"
			},
			'ahmar': {
				'frame': 3,
				'color': "#ff0000"
			},
			'azrak': {
				'frame': 1,
				'color': "#0000ff"
			},
			'asfar': {
				'frame': 4,
				'color': "#ffff00"
			},
			'akhdar': {
				'frame': 5,
				'color': "#008000"
			},
			'purple': {
				'frame': 6,
				'color': "#8a2be2"
			},
		
		}
		
			function feu_loun(evt) {
		
				evt.stopImmediatePropagation();
				obj = list_frame[evt.currentTarget.name];
				evt.currentTarget.parent.gotoAndStop(obj['frame']);
		
				that.parent.f_color = obj['color'];
		
				that.parent.current_f_color = obj['frame'];
		
			}
	}
	this.frame_8 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(7).call(this.frame_7).wait(1).call(this.frame_8).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-15.6,-12.3,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_63();
	this.instance_1.setTransform(-15.6,-12.2,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_64();
	this.instance_2.setTransform(-15.6,-12.2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_65();
	this.instance_3.setTransform(-15.6,-12.2,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_66();
	this.instance_4.setTransform(-15.6,-12.2,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_67();
	this.instance_5.setTransform(-15.6,-12.2,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_68();
	this.instance_6.setTransform(-15.6,-12.2,0.5,0.5);

	this.azrak = new lib.Symbol21();
	this.azrak.name = "azrak";
	this.azrak.setTransform(53.5,-36);

	this.ahmar = new lib.Symbol20();
	this.ahmar.name = "ahmar";
	this.ahmar.setTransform(23.8,-36);

	this.orange = new lib.Symbol19();
	this.orange.name = "orange";
	this.orange.setTransform(-6,-36);

	this.purple = new lib.Symbol18();
	this.purple.name = "purple";
	this.purple.setTransform(53.5,-67.55);

	this.asfar = new lib.Symbol17();
	this.asfar.name = "asfar";
	this.asfar.setTransform(23.8,-67.55);

	this.akhdar = new lib.Symbol16();
	this.akhdar.name = "akhdar";
	this.akhdar.setTransform(-6,-67.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{y:-12.3}}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance,p:{y:-12.2}},{t:this.akhdar,p:{skewX:0,x:-6,y:-67.55}},{t:this.asfar,p:{skewX:0,x:23.8,y:-67.55}},{t:this.purple,p:{skewX:0,x:53.5,y:-67.55}},{t:this.orange,p:{skewX:0,x:-6,y:-36}},{t:this.ahmar,p:{skewX:0,x:23.8,y:-36}},{t:this.azrak,p:{skewX:0,x:53.5,y:-36}}]},1).to({state:[{t:this.instance,p:{y:-12.2}},{t:this.akhdar,p:{skewX:180,x:-9.2,y:69.55}},{t:this.asfar,p:{skewX:180,x:20.6,y:69.55}},{t:this.purple,p:{skewX:180,x:50.3,y:69.55}},{t:this.orange,p:{skewX:180,x:-9.2,y:38}},{t:this.ahmar,p:{skewX:180,x:20.6,y:38}},{t:this.azrak,p:{skewX:180,x:50.3,y:38}}]},1).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-4.65,1.85);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.2,-80.5,86.7,163.1);


(lib.eye = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// Layer_2
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(-10.95,-12.35,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_61();
	this.instance_1.setTransform(-11.8,-10.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},1).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(2.7,0.55);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.7,-14.4,31.2,29.6);


(lib.goToPgcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-17.55,-6.3,0.4465,0.4465);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.bkg = new lib.bkg();
	this.bkg.name = "bkg";
	this.bkg.setTransform(-20.9,-21.35,1.0282,1.1824,0,0,0,-17.8,-17.2);

	this.timeline.addTween(cjs.Tween.get(this.bkg).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.goToPgcopy, new cjs.Rectangle(-18.5,-18.7,32.2,35), null);


(lib.correctcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Layer_2
	this.instance = new lib.images1();
	this.instance.setTransform(-30,8,0.2095,0.1814);

	this.instance_1 = new lib.akmilcopy();
	this.instance_1.setTransform(-59.85,74.9);

	this.instance_2 = new lib.akmil_1();
	this.instance_2.setTransform(-65.15,21.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.1,8,85.6,41.4);


(lib.correct = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Layer_2
	this.instance = new lib.images1();
	this.instance.setTransform(-30,8,0.2095,0.1814);

	this.instance_1 = new lib.akmilcopy_1();
	this.instance_1.setTransform(-59.85,74.9);

	this.instance_2 = new lib.akmil();
	this.instance_2.setTransform(-65.15,21.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.1,8,85.6,41.4);


(lib.tool = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.visible = false ;
	}
	this.frame_1 = function() {
		this.stop();
		this.visible=true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// qalam
	this.qalam = new lib.Symbol15();
	this.qalam.name = "qalam";
	this.qalam.setTransform(16.35,16.85);

	this.timeline.addTween(cjs.Tween.get(this.qalam).wait(2));

	// somkmc
	this.somkmc = new lib.Symbol14();
	this.somkmc.name = "somkmc";
	this.somkmc.setTransform(59.45,16.9);

	this.timeline.addTween(cjs.Tween.get(this.somkmc).wait(2));

	// feutre
	this.feutre = new lib.feutre();
	this.feutre.name = "feutre";
	this.feutre.setTransform(106.6,15.05);

	this.timeline.addTween(cjs.Tween.get(this.feutre).wait(2));

	// mimsaha
	this.mimsaha = new lib.Symbol13();
	this.mimsaha.name = "mimsaha";
	this.mimsaha.setTransform(147.55,16.9);

	this.timeline.addTween(cjs.Tween.get(this.mimsaha).wait(2));

	// circle
	this.circle = new lib.Symbol12();
	this.circle.name = "circle";
	this.circle.setTransform(226.55,17.15);

	this.timeline.addTween(cjs.Tween.get(this.circle).wait(2));

	// square
	this.square = new lib.Symbol11();
	this.square.name = "square";
	this.square.setTransform(187.4,17.15);

	this.timeline.addTween(cjs.Tween.get(this.square).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.3,1.9,240.29999999999998,30.1);


(lib.settin = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_9 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(1));

	// full_eye
	this.full_eye = new lib.fullscr();
	this.full_eye.name = "full_eye";
	this.full_eye.setTransform(-52.75,-36.4);

	this.timeline.addTween(cjs.Tween.get(this.full_eye).to({x:1.65},9).wait(1));

	// default_menu
	this.default_menu = new lib.re_menu();
	this.default_menu.name = "default_menu";
	this.default_menu.setTransform(-55.55,35.45);

	this.timeline.addTween(cjs.Tween.get(this.default_menu).to({x:-1.15},9).wait(1));

	// eye_tmrn
	this.eye_tmrn = new lib.eye();
	this.eye_tmrn.name = "eye_tmrn";
	this.eye_tmrn.setTransform(-54.4,-0.55);

	this.timeline.addTween(cjs.Tween.get(this.eye_tmrn).to({x:0},9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.9,-51.6,87.30000000000001,102.1);


(lib.cswtext1_19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.CTXTمَـ = new lib.an_TextInput({'id': 'CTXTمَـ', 'value':'', 'disabled':false, 'visible':true, 'class':'ui-textinput'});

	this.CTXTمَـ.name = "CTXTمَـ";
	this.CTXTمَـ.setTransform(313.6,310.35,0.2029,1.5202,0,0,0,101,11);

	this.HTXTمٌ = new lib.an_TextInput({'id': 'HTXTمٌ', 'value':'', 'disabled':false, 'visible':true, 'class':'ui-textinput'});

	this.HTXTمٌ.name = "HTXTمٌ";
	this.HTXTمٌ.setTransform(88.55,306.35,0.183,1.5202,0,0,0,100.9,11);

	this.zTXTمِـ = new lib.an_TextInput({'id': 'zTXTمِـ', 'value':'', 'disabled':false, 'visible':true, 'class':'ui-textinput'});

	this.zTXTمِـ.name = "zTXTمِـ";
	this.zTXTمِـ.setTransform(512.55,310.35,0.183,1.5202,0,0,0,100.9,11);

	this.DTXTـمَا = new lib.an_TextInput({'id': 'DTXTـمَا', 'value':'', 'disabled':false, 'visible':true, 'class':'ui-textinput'});

	this.DTXTـمَا.name = "DTXTـمَا";
	this.DTXTـمَا.setTransform(675.15,311.35,0.2523,1.5202,0,0,0,100.9,11);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.DTXTـمَا},{t:this.zTXTمِـ},{t:this.HTXTمٌ},{t:this.CTXTمَـ}]}).wait(1));

	// Layer_3
	this.replay = new lib.replay();
	this.replay.name = "replay";
	this.replay.setTransform(160.7,393.25,0.6654,0.6454,0,0,0,0.3,-0.8);

	this.correctbtn = new lib.correct();
	this.correctbtn.name = "correctbtn";
	this.correctbtn.setTransform(126.3,394.85,0.6187,0.6454,0,0,0,2.2,6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.correctbtn},{t:this.replay}]}).wait(1));

	// Layer_1
	this.instance = new lib.Bitmap20();
	this.instance.setTransform(0,51,0.4954,0.4617);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cswtext1_19, new cjs.Rectangle(0,51,808,372), null);


(lib.cswcolo1_16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.forchat2 = new lib.Symbol27();
	this.forchat2.name = "forchat2";
	this.forchat2.setTransform(632.1,125.65);

	this.forchat1 = new lib.Symbol26copy();
	this.forchat1.name = "forchat1";
	this.forchat1.setTransform(609.25,101.85,0.9417,1.0883);

	this.forchat3 = new lib.Symbol23_1();
	this.forchat3.name = "forchat3";
	this.forchat3.setTransform(665.85,126.2,0.5763,0.5737,0,0,0,0.4,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.forchat3},{t:this.forchat1},{t:this.forchat2}]}).wait(1));

	// Layer_6
	this.Rlounx = new lib.Symbol1copy();
	this.Rlounx.name = "Rlounx";
	this.Rlounx.setTransform(128.35,165.45,0.7054,0.8288,0,0,0,-50.1,-9.2);

	this.Qlounx = new lib.Symbol1copy();
	this.Qlounx.name = "Qlounx";
	this.Qlounx.setTransform(127.7,264.9,0.6976,0.8503,0,0,0,-51.8,-23);

	this.Zlouna = new lib.Symbol1copy();
	this.Zlouna.name = "Zlouna";
	this.Zlouna.setTransform(126.95,218.8,0.7103,0.8313,0,0,0,-51.9,-22.9);

	this.Alounx = new lib.Symbol1copy();
	this.Alounx.name = "Alounx";
	this.Alounx.setTransform(219.5,337.15,0.7049,0.8376,0,0,0,77.7,-24.2);

	this.Flouna = new lib.Symbol1copy();
	this.Flouna.name = "Flouna";
	this.Flouna.setTransform(128.25,382.45,0.6948,0.8333,0,0,0,-51.8,-23);

	this.Rlouna = new lib.Symbol1copy();
	this.Rlouna.name = "Rlouna";
	this.Rlouna.setTransform(218.3,101.4,0.7038,0.8343,0,0,0,77.6,-24.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Rlouna},{t:this.Flouna},{t:this.Alounx},{t:this.Zlouna},{t:this.Qlounx},{t:this.Rlounx}]}).wait(1));

	// Layer_7
	this.replay = new lib.replaycopy();
	this.replay.name = "replay";
	this.replay.setTransform(129.7,450.25,0.6654,0.6454,0,0,0,0.3,-0.8);

	this.correctbtn = new lib.correctcopy();
	this.correctbtn.name = "correctbtn";
	this.correctbtn.setTransform(95.3,451.85,0.6187,0.6454,0,0,0,2.2,6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.correctbtn},{t:this.replay}]}).wait(1));

	// Layer_8
	this.instance_1 = new lib.CachedBmp_96();
	this.instance_1.setTransform(-3.95,67.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_9
	this.instance_2 = new lib.Bitmap26();
	this.instance_2.setTransform(18,44,0.4223,0.2714);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cswcolo1_16, new cjs.Rectangle(-3.9,44,701.9,436), null);


(lib.cswtext1_13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.JTXTمٌ = new lib.an_TextInput({'id': 'JTXTمٌ', 'value':'', 'disabled':false, 'visible':true, 'class':'ui-textinput'});

	this.JTXTمٌ.name = "JTXTمٌ";
	this.JTXTمٌ.setTransform(161.5,257.05,0.1541,1.3683,0,0,0,101.2,11);

	this.KTXTـمْـ = new lib.an_TextInput({'id': 'KTXTـمْـ', 'value':'', 'disabled':false, 'visible':true, 'class':'ui-textinput'});

	this.KTXTـمْـ.name = "KTXTـمْـ";
	this.KTXTـمْـ.setTransform(418.85,261.05,0.2533,1.3683,0,0,0,100.5,11);

	this.ZTXTمِـ = new lib.an_TextInput({'id': 'ZTXTمِـ', 'value':'', 'disabled':false, 'visible':true, 'class':'ui-textinput'});

	this.ZTXTمِـ.name = "ZTXTمِـ";
	this.ZTXTمِـ.setTransform(654.5,261.05,0.2533,1.3683,0,0,0,100.5,11);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ZTXTمِـ},{t:this.KTXTـمْـ},{t:this.JTXTمٌ}]}).wait(1));

	// Layer_3
	this.replay = new lib.replay();
	this.replay.name = "replay";
	this.replay.setTransform(158.7,407.25,0.6654,0.6454,0,0,0,0.3,-0.8);

	this.correctbtn = new lib.correct();
	this.correctbtn.name = "correctbtn";
	this.correctbtn.setTransform(124.3,408.85,0.6187,0.6454,0,0,0,2.2,6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.correctbtn},{t:this.replay}]}).wait(1));

	// Layer_3
	this.instance_2 = new lib.Bitmap19();
	this.instance_2.setTransform(0,36,0.4809,0.3543);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cswtext1_13, new cjs.Rectangle(0,36,759.8,401), null);


(lib.cswssil4_19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.RLINKRFF = new lib.chfafsilcopy();
	this.RLINKRFF.name = "RLINKRFF";
	this.RLINKRFF.setTransform(199.75,315.75,0.7727,1.4559);

	this.RLINKRHH = new lib.chfafsilcopy();
	this.RLINKRHH.name = "RLINKRHH";
	this.RLINKRHH.setTransform(199.75,248.05,0.7727,1.4559);

	this.RLINKRBB = new lib.chfafsilcopy();
	this.RLINKRBB.name = "RLINKRBB";
	this.RLINKRBB.setTransform(199.75,182.3,0.7727,1.4559);

	this.RLINKLBB = new lib.chfafsilcopy();
	this.RLINKLBB.name = "RLINKLBB";
	this.RLINKLBB.setTransform(81.95,246.1,0.5497,1.6521);

	this.RLINKRCC = new lib.chfafsilcopy();
	this.RLINKRCC.name = "RLINKRCC";
	this.RLINKRCC.setTransform(445.35,312.75,0.7727,1.4559);

	this.RLINKRRR = new lib.chfafsilcopy();
	this.RLINKRRR.name = "RLINKRRR";
	this.RLINKRRR.setTransform(445.35,245.05,0.7727,1.4559);

	this.RLINKRAA = new lib.chfafsilcopy();
	this.RLINKRAA.name = "RLINKRAA";
	this.RLINKRAA.setTransform(445.35,179.3,0.7727,1.4559);

	this.RLINKRZZ = new lib.chfafsilcopy();
	this.RLINKRZZ.name = "RLINKRZZ";
	this.RLINKRZZ.setTransform(681.95,312.7,0.8136,1.4341);

	this.RLINKRDD = new lib.chfafsilcopy();
	this.RLINKRDD.name = "RLINKRDD";
	this.RLINKRDD.setTransform(681.95,248.6,0.8136,1.4341);

	this.RLINKREE = new lib.chfafsilcopy();
	this.RLINKREE.name = "RLINKREE";
	this.RLINKREE.setTransform(681.95,182.05,0.8136,1.4341,0,0,0,0,0.1);

	this.RLINKLRR = new lib.chfafsilcopy();
	this.RLINKLRR.name = "RLINKLRR";
	this.RLINKLRR.setTransform(319.55,246.1,0.5497,1.6521);

	this.RLINKLZZ = new lib.chfafsilcopy();
	this.RLINKLZZ.name = "RLINKLZZ";
	this.RLINKLZZ.setTransform(557.75,248.1,0.5415,1.6,0,0,0,0.1,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.RLINKLZZ},{t:this.RLINKLRR},{t:this.RLINKREE},{t:this.RLINKRDD},{t:this.RLINKRZZ},{t:this.RLINKRAA},{t:this.RLINKRRR},{t:this.RLINKRCC},{t:this.RLINKLBB},{t:this.RLINKRBB},{t:this.RLINKRHH},{t:this.RLINKRFF}]}).wait(1));

	// Layer_3
	this.replay = new lib.replay();
	this.replay.name = "replay";
	this.replay.setTransform(138.95,420.25,0.6654,0.6454,0,0,0,0.3,-0.8);

	this.correctbtn = new lib.correct();
	this.correctbtn.name = "correctbtn";
	this.correctbtn.setTransform(104.55,421.85,0.6187,0.6454,0,0,0,2.2,6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.correctbtn},{t:this.replay}]}).wait(1));

	// Layer_1
	this.instance_2 = new lib.Bitmap18();
	this.instance_2.setTransform(0,36,0.4899,0.5143);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cswssil4_19, new cjs.Rectangle(0,36,800,414), null);


// stage content:
(lib.newtool = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		this.stop();
		
		
		var maxPage = 126;
		home_page = 4;
		
		var that = this;
		var currentPage = 0;
		var scaleFac = 0;
		var tmrnAdded = false;
		var is_tool_clicked;
		
		var firstwidth = 0;
		var firstheight = 0;
		
		var scalx;
		var scaly;
		
		var update_coord = false;
		var vid, source, removeBtn, parent, grand_father;
		var menu_list = [];
		
		document.body.style.overflow = 'hidden';
		
		stage.enableMouseOver(20);
		
		
		
		createjs.Touch.enable(stage, true, true);
		
		window.Modernizr = {touch: true,};
		
		var isTouch = true;
		
		alert('34')
		
		setTimeout(function () {
		
			initTextStyle();
		
		
		}, 100);
		
		
		function initTextStyle() {
		
		
		
			document.addEventListener('keyup', function (e) {
				if (e.key === 'Enter') {
					if (document.activeElement === that.pageNum && that.goPage.alpha === 1)
						goPage();
				}
			});
		
		
		
			vid = document.getElementById('vi');
			source = document.createElement('source');
		
			vid.appendChild(source);
		
			removeBtn = document.getElementById("remove");
			removeBtn.addEventListener("click", Delete);
		
			dragElement(document.getElementById("mydiv"));
		
		
			parent = removeBtn.parentNode;
			grand_father = parent.parentNode;
		
			that.pageNum = document.getElementById("pageNum");
			that.pageNum.style.color = '#000000';
			that.pageNum.style.fontSize = '2vw';
			that.pageNum.style.fontFamily = "'Markazi Text' ,serif";
			that.pageNum.name = 'my pageNum';
			that.pageNum.maxLength = 3;
		
			that.goPage.addEventListener("click", goPage);
			that.goPage.addEventListener("rollover", overBtn);
			that.goPage.addEventListener("rollout", outBtn);
		
			that.book.addEventListener("click", toBook);
			that.book.addEventListener("rollover", overBtn);
			that.book.addEventListener("rollout", outBtn);
		
		
			that.home.addEventListener("click", toHome);
			that.home.addEventListener("rollover", overBtn);
			that.home.addEventListener("rollout", outBtn);
		
			that.re_set.addEventListener("click", toreset);
		
		
		
			that.plus.addEventListener("click", onPlus);
			that.plus.addEventListener("mouseover", overBtn);
			that.plus.addEventListener("mouseout", outBtn);
		
			that.minus.addEventListener("click", onMinus);
			that.minus.addEventListener("mouseover", overBtn);
			that.minus.addEventListener("mouseout", outBtn);
		
			that.grey_tool.addEventListener("click", blok);
		
			that.tool_btn.addEventListener("rollover", overBtn);
			that.tool_btn.addEventListener("rollout", outBtn);
			that.tool_btn.addEventListener("click", toTools);
		
			that.settin_btn.addEventListener("rollover", overBtn);
			that.settin_btn.addEventListener("rollout", outBtn);
			that.settin_btn.addEventListener("click", toSettin);
		
			that.re_set.addEventListener("rollover", overBtn);
			that.re_set.addEventListener("rollout", outBtn);
		
			that.prv.addEventListener("click", toPrv);
			that.prv.addEventListener("rollover", overBtn);
			that.prv.addEventListener("rollout", outBtn);
		
		
			that.next.addEventListener("click", toNx);
			that.next.addEventListener("rollover", overBtn);
			that.next.addEventListener("rollout", outBtn);
		
		
		
			menu_list = [that.next, that.prv, that.re_set, that.tool_btn,
				that.goPage, that.home, that.book, that.sound_sld,
		
			];
		
			get_origin_x();
		
		
			that.addChildAt(cont, 0);
		
			that.addChildAt(contmrn, 1);
		
		
		
			setSabora(currentPage);
		
		
			changePage(currentPage);
		}
		
		
		function get_origin_x() {
		
			for (var u = 0; u < menu_list.length; u++) {
				menu_list[u].origin_x = menu_list[u].x;
				menu_list[u].origin_scal_x = menu_list[u].scaleX;
		
				if (menu_list[u].bkg) {
					menu_list[u].bkg.origin_scal_x = menu_list[u].bkg.scaleX;
				}
			}
		
		
			that.tool.origin_y = that.tool.y;
			that.tool.origin_scal_x = that.tool.scaleX;
			that.tool.origin_scal_y = that.tool.scaleY;
		
		}
		
		
		
		function reset_menu() {
			for (var u = 0; u < menu_list.length; u++) {
				menu_list[u].x = menu_list[u].origin_x;
				menu_list[u].scaleX = menu_list[u].origin_scal_x;
		
				if (menu_list[u].bkg) {
					menu_list[u].bkg.scaleX = menu_list[u].bkg.origin_scal_x;
				}
		
		
			}
			that.tool.y = that.tool.origin_y;
			that.tool.scaleX = that.tool.origin_scal_x;
			that.tool.scaleY = that.tool.origin_scal_y;
		
		
			that.pageNum.style.left = '0px';
		
			that.next.visible = true;
			that.prv.visible = true;
			that.plus.visible = true;
			that.minus.visible = true;
			that.re_set.visible = true;
		
			that.book.bkg.scaleX = that.book.bkg.origin_scal_x;
			that.home.bkg.scaleX = that.home.bkg.origin_scal_x;
			that.tool_btn.bkg.scaleX = that.tool_btn.bkg.origin_scal_x;
		
		}
		function set_ui() {
		
			that.next.visible = false;
			that.prv.visible = false;
			that.plus.visible = false;
			that.minus.visible = false;
			that.re_set.visible = false;
		
			that.home.x = that.home.x - 240;
			that.book.x = that.book.x - 60;
			that.tool_btn.x = that.tool_btn.x + 80;
			that.goPage.x = that.goPage.x + 60;
		
		
		
			that.book.bkg.scaleX = 3.2 + (1 / that.book.bkg.origin_scal_x);
			that.home.bkg.scaleX = 3.2 + (1 / that.home.bkg.origin_scal_x);
			that.tool_btn.bkg.scaleX = 3.2 + (1 / that.tool_btn.bkg.origin_scal_x);
		
		
			that.pageNum.style.left = 10 + '%'; //((that.goPage.origin_x + that.goPage.x) * (scalx)) + 'px';
			that.sound_sld.scaleX = 1.4;
		
			that.tool.scaleX = 1.3;
			that.tool.scaleY = 1.3;
			that.tool.y = (lib.properties['height'] - that.tool.getTransformedBounds().height) - that.tool_btn.getTransformedBounds().height - 8;
		}
		
		
		
		function remove_settin() {
		
			is_settin_clicked = false;
			that.settin.gotoAndStop(0);
			child_array = that.settin.children;
			for (var i = 0; i < child_array.length; i++) {
		
				child_array[i].bkg.gotoAndStop(0);
		
			}
			console.log('child_array', child_array);
		}
		
		function overBtn(ev) {
		
		
		
			ev.currentTarget.bkg.gotoAndStop(1);
		
			if (ev.currentTarget !== that.settin_btn && ev.currentTarget.parent !== that.settin) {
				remove_settin();
			}
		
		}
		function outBtn(ev) {
		
		
			ev.currentTarget.bkg.gotoAndStop(0);
		}
		
		
		var chafaf = new lib.chafaf();
		
		
		
		function blok(e) {
		
		
			e.stopPropagation();
		
		
		
		}
		var cont = new createjs.Container();
		cont.name = "tttt";
		var awraq = new lib.waraq();
		var dill = new lib.addil();
		awraq.x = -10;
		
		awraq.scaleX = 1.075;
		
		awraq.scaleY = 1.078;
		
		dill.x = 320;
		
		dill.scaleY = 1.150;
		
		cont.isDragged = false;
		
		var offsetX = 0;
		var offsetY = 0;
		var chafaf_is_add = false;
		
		
		
		var queue = new createjs.LoadQueue(false);
		
		queue.on("complete", function (event) {
		
			that.page_loader.visible = false;
			that.page_loader.gotoAndStop(0);
		       that.page_loader.mouseEnabled = false ;
		
		
			var image = queue.getResult("image");
			bmp = new createjs.Bitmap(image);
		
		
		
			bmp.cache(0, 0, image.width, image.height);
		
			if (firstwidth == 0) {
		
		
				var image_h = image.height;
		
				console.log(' image.width', image.width);
		
				scalx = (500 / (image_h + 100)); //100 
				scaly = (500 / (image_h + 150)); //250
		
				firstwidth = image.width * scalx;
				firstheight = image_h * scaly;
		
		
		
				cont.origin_regX = firstwidth / 2;
				cont.origin_regY = (firstheight / 2) //+ 10;
		
		
				cont.regX = cont.origin_regX;
				cont.regY = cont.origin_regY;
		
		
		
		
				offsetX = (1000 - firstwidth) / 2;
				offsetY = (500 - firstheight) / 2 + 10;
		
				console.log('scalx', scalx);
				console.log('scaly', scaly);
		
		
				cont.x = (firstwidth / 2) + offsetX;
				cont.y = (firstheight / 2) + offsetY;
		
		
		
				chafaf.scaleX = scalx;
				chafaf.scaleY = scaly; //- 0.01
		
				//chafaf.x = chafaf.x + 27;
				//chafaf.y = chafaf.y + 25;
		
		
			}
			bmp.scaleX = scalx;
			bmp.scaleY = scaly;
		
		
			cont.removeAllChildren();
		
		
		
			cont.addChild(awraq);
			cont.addChildAt(bmp, 1);
			cont.addChildAt(dill, 2);
			cont.addChildAt(sbr, 3);
			frameChafaf();
		
		});
		
		
		function frameChafaf() {
		
		
			if (!chafaf_is_add) {
		
				chafaf_is_add = true;
				chafaf.gotoAndStop(0);
			}
			cont.addChild(chafaf);
		
			chafaf.removeYad_by_frame();
		
			cs_removeListener(chafaf.listofcs);
		
			chafaf.listofcs = [];
		
			chafaf.gotoAndStop(currentPage / 2);
		
			cs_setListener(chafaf.listofcs);
		
			chafaf.addYad_by_frame(chafaf.listofcs)
		
		}
		
		function cs_removeListener(list_cs) {
			for (var i = 0; i < list_cs.length; i++) {
		
				if (list_cs[i].name.slice(0, 2) != 'zm') {
		
					list_cs[i].removeEventListener('click', handle);
		
				} else list_cs[i].removeEventListener('click', chafaf.zomhandle);
		
		
			}
		
		}
		
		
		function cs_setListener(list_cs) {
		
			for (var i = 0; i < list_cs.length; i++) {
		
				if (list_cs[i].name.slice(0, 2) != 'zm') {
		
					list_cs[i].addEventListener('click', handle);
		
				} else list_cs[i].addEventListener('click', chafaf.zomhandle);
			}
		
		}
		
		function get_csType(st) {
		
			var cstype = "";
			switch (st) {
		
		
				case "lect":
					cstype = "lecture_z";
		
					break;
				case "colo":
					cstype = "color";
		
					break;
				case "anyc":
					cstype = "anyColor";
		
					break;
				case "same":
					cstype = "sameColor";
		
					break;
				case "ssil":
					cstype = "sil";
		
					break;
		
				case "soun":
					cstype = "sound";
		
					break;
				case "souf":
					cstype = "sound_fixe";
		
					break;
				case "ento" || "croc" || "bbar":
					cstype = "entour";
		
					break;
		
				case "text":
					cstype = "text";
		
					break;
				case "mdnd":
					cstype = "multi_dnd";
		
					break;
				case "ddnd":
					cstype = "dnd";
		
					break;
		
				case "vide":
					cstype = "video";
		
					break;
			}
		
			return cstype;
		
		}
		function handle(e) {
			
		console.log('cont.isDragged : ' , cont.isDragged)
			
			console.log('e.currentTarget.name: ' , e.currentTarget.name)
			console.log('handle(e)e.nativeEvent : ' ,e.nativeEvent)
			
			
			if (cont.isDragged) return;
		
		
		
			var nameOfcs = e.currentTarget.name;
		
			var arr = nameOfcs.split("w");
		
		
			cont.mc_type = get_csType(arr[1].slice(0, 4));
		
		
			if (cont.mc_type == 'video') {
		
				videoManager(nameOfcs);
		
				return;
			}
			cont.mc = new lib[nameOfcs]();
			cont.mc.name = nameOfcs;
		
		
			cont.totam(null);
		
			
		
		}
		
		
		function changePage(file) {
		
			that.page_loader.gotoAndPlay(1);
			that.page_loader.visible = true;
		
		   
		
			queue.loadFile({
				src: "pages/" + file + ".jpg",
				id: "image"
			});
		
		
		
		}
		
		function toPrv(ev, swap = false) {
		
			if (swap || ev.nativeEvent instanceof MouseEvent) {
		//ev.nativeEvent.preventDefault();
				if (currentPage - 2 < 0) return;
				currentPage -= 2;
				that.pageNum.value = currentPage;
		
		
		
		
				preparChangePage(currentPage);
			}
		
		}
		
		
		function toNx(ev, swap = false) {
		console.log('toNex e.nativeEvent : ' ,ev.nativeEvent)
			
			if (swap || ev.nativeEvent instanceof MouseEvent) {
		//ev.nativeEvent.preventDefault();
				if (currentPage + 2 > maxPage) return;
		
				currentPage += 2;
				that.pageNum.value = currentPage;
		
				preparChangePage(currentPage);
		
		
			}
		}
		
		function setSabora(currentPage) {
		
			if (store_sbr.hasOwnProperty("" + currentPage)) {
		
				sbr = store_sbr["" + currentPage];
				hjbArrays = store_hjb_shapeArray["" + currentPage];
		
			} else {
		
				sbr = createNew_sbr();
				hjbArrays = [];
		
				store_sbr["" + currentPage] = sbr;
				store_hjb_shapeArray["" + currentPage] = hjbArrays;
			}
		
		
		}
		
		
		function startDrag() {
		
			cont.addEventListener("pressup", onpressup);
			cont.addEventListener("pressmove", onpressmove);
			cont.addEventListener("mousedown", cont_onmousedown);
		
		
		}
		
		startDrag();
		cont.startDrag = startDrag;
		
		
		
		var previous_x_update = false;
		
		function cont_onmousedown(e) {
		       stage.preventSelection = false;
			//console.log('befor cont_onmousedown(e) check if e.nativeEvent  ' ,e);
			//if ( e.nativeEvent instanceof MouseEvent) {
				console.log('cont_onmousedown(e) check if e.nativeEvent ' ,e);
			//cont.addEventListener("pressmove", onpressmove);
		
			cont.isDragged = false;
		
			
			previous_x_update = false;
		
			var pt = that.globalToLocal(e.stageX, e.stageY);
			var posX = pt.x;
			var posY = pt.y;
			e.currentTarget.offset = {
				x: posX - e.currentTarget.x,
				y: posY - e.currentTarget.y
			};
		
			e.currentTarget.down = {
				x: posX,
				y: posY
			};
		//}
		}
		
		function stopDrag() {
		
		
			cont.removeEventListener("pressup", onpressup);
			cont.removeEventListener("pressmove", onpressmove);
			cont.removeEventListener("mousedown", cont_onmousedown);
		
		
		}
		
		
		cont.stopDrag = stopDrag;
		
		function swapToNext(newdist, evt) {
		
		
			if (newdist > 100) {
		
				toNx(evt, true);
			}
			if (newdist < -100) {
		
				toPrv(evt, true);
			}
		}
		
		
		//stage.preventSelection = false;
		function onpressmove(e) {
		
		
			//if ( e.nativeEvent instanceof MouseEvent) {
				console.log(' cont onpressmove witout prevent ' ,e);
			//e.nativeEvent.preventDefault();
		       cont.isDragged = true;
			var pt = that.globalToLocal(e.stageX, e.stageY);
		
			var newX = pt.x - e.currentTarget.offset.x;
			var newY = pt.y - e.currentTarget.offset.y;
		
		
			var mult = scaleFac * firstwidth;
		
			if (mult / 2 - ((firstwidth / 2 + offsetX) - newX) > firstwidth / 2 && mult / 2 - (newX - (firstwidth / 2 + offsetX)) > firstwidth / 2) {
		
				e.currentTarget.x = newX;
		
				update_coord = true;
				previous_x_update = true;
			}
		
			var mult2 = scaleFac * firstheight;
			if (mult2 / 2 - ((firstheight / 2 + offsetY) - newY) > firstheight / 2 && mult2 / 2 - (newY - (firstheight / 2 + offsetY)) > firstheight / 2) {
		
				e.currentTarget.y = newY;
				update_coord = true;
		
			}
		
			if (update_coord) { //   chech if stage update can be remplaced by the default tiker
		
				//stage.update();
				update_coord = false;
				
			}
		
			//}
		
		}
		
		

		
		
		function onpressup(evt) {
			console.log('befor cont_onpressup(e) check if e.nativeEvent ' ,evt);
		//if ( evt.nativeEvent instanceof MouseEvent) {
			console.log('cont_onpressup(e) check if e.nativeEvent ' ,evt);
			//cont.removeEventListener("pressmove", onpressmove);
		
			var pt = that.globalToLocal(evt.stageX, evt.stageY);
		
		
		
			if ((Math.abs(evt.currentTarget.down.x - pt.x) * scaleFac) > 100 && !previous_x_update || (cont.isDragged && scaleFac === 0)) {
				swapToNext(evt.currentTarget.down.x - pt.x, evt);
			}
			stage.update();
			cont.isDragged = false;
		
			remove_settin();
		//}
		}
		
		
		function toHome(e) {
		
			if (e.nativeEvent instanceof MouseEvent) {
		
		
				currentPage = home_page;
				that.pageNum.value = currentPage;
		
				preparChangePage(currentPage);
			}
		}
		
		
		
		function goPage(e) {
		
			var isCorrectInteger = Number.isInteger(parseInt(that.pageNum.value));
			if (!isCorrectInteger) return;
		
		
			var inputValue = parseInt(that.pageNum.value);
		
			if (inputValue > maxPage) {
		
				that.pageNum.value = maxPage;
				inputValue = maxPage;
			}
			if (inputValue < 0) {
		
				that.pageNum.value = 0;
				inputValue = 0;
			}
		
			currentPage = inputValue - inputValue % 2;
		
		
			preparChangePage(currentPage);
		
		}
		
		function preparChangePage(currentPage) {
		
		
			if (is_tool_clicked) {
				end_tool();
			}
		
			setSabora(currentPage);
		
			changePage(currentPage);
		
		}
		
		
		function toBook(e) {
		
			if (e.nativeEvent instanceof MouseEvent) {
		
		
		
				e.currentTarget.gotoAndPlay(1);
		
		
		
				chafaf.mouseEnabled = true;
		
				if (tmrnAdded) {
		
					sbr_tmrn.removeAllEventListeners();
				}
		
				clearTmrn();
		
				if (is_tool_clicked) {
		
					end_tool();
				}
			}
		
		}
		
		
		
		var contmrn = new createjs.Container();
		contmrn.x = 0;
		contmrn.y = 0;
		
		
		 stage.addChild(contmrn);
		
		
		function blockChafaf() {
		
			chafaf.mouseEnabled = false;
		
		}
		that.blockChafaf = blockChafaf;
		
		
		function unblockChafaf() {
		
			chafaf.mouseEnabled = true;
		
		}
		that.unblockChafaf = unblockChafaf;
		
		
		
		dragable(that.tool);
		
		
				function dragable(obj) {
				
					obj.addEventListener("mousedown", function (e) {
				       
					   obj.isdraged = false;
						var global = obj.parent.localToGlobal(obj.x, obj.y);
						obj.offset = {
							'x': global.x - e.stageX,
							'y': global.y - e.stageY
						};
				
						obj.addEventListener("pressmove", dragableMove)
						obj.addEventListener("pressup", dragableUp);
				
					});
				
					function dragableMove(e) {
				
						e.nativeEvent.preventDefault();
				
						obj.isdraged = true;
						var local = obj.parent.globalToLocal(e.stageX + obj.offset.x, e.stageY + obj.offset.y);
				
				
						var global = obj.parent.localToGlobal(obj.x, obj.y)
				
				
						if (local.y < 0 || local.y + obj.getTransformedBounds().height >
							lib.properties["height"] - that.tool_btn.getTransformedBounds().height || local.x < 0 || local.x + obj.getTransformedBounds().width >
							lib.properties["width"]) return;
						obj.x = local.x;
						obj.y = local.y;
						stage.update();
				
					}
				
				
					function dragableUp(e) {
						
						if (obj.isdraged ) {
						e.nativeEvent.preventDefault();
				
						var global = obj.parent.localToGlobal(obj.x, obj.y)
						that.isLeft = global.x < (lib.properties["width"] / 2);
						obj.isdraged = false;
				
						obj.removeEventListener("pressup", dragableUp);
						obj.removeEventListener("pressmove", dragableMove)
						}
						
						
					}
				
				
				}
		
		
		function add_remove(shap, type) {
		
		
			if (type === "circle") {
		
				shap.sq.visible = false;
		
			} else if (type === "square") {
		
				shap.ci.visible = false;
			}
			var rm_shape = new lib.rem_shape();
		
			rm_shape.scaleX = 1 / shap.scaleX;
			rm_shape.scaleY = 1 / shap.scaleY;
		
			shap.addChild(rm_shape);
		
			rm_shape.addEventListener("click", toRemove_shape);
		
			function toRemove_shape() {
		
		
				rm_shape.removeEventListener("click", toRemove_shape);
		
				shap.parent.removeChild(shap);
			}
		
		}
		
		function addShapeToKtb(sh) {
		
			if (Math.abs(sh.width) < 15 && Math.abs(sh.height) < 15) return;
		
			var scal_wid;
			var scal_hei;
		
		
		
			var c = new lib.shap_hjb();
			c.x = sh.x;
			c.y = sh.y;
		
		
			if (sh.typeofShape === "circle") {
		
				var radius = c.getBounds().width;
		
				scal_wid = Math.max(sh.width, sh.height) / radius * 2;
				scal_hei = Math.max(sh.width, sh.height) / radius * 2;
		
			} else if (sh.typeofShape === "square") {
		
				scal_wid = sh.width / c.getBounds().width;
				scal_hei = sh.height / c.getBounds().height;
		
		
			}
		
			c.scaleX = scal_wid * 1.5;
			c.scaleY = scal_hei * 1.5;
		
			//c.add_remove(c.scaleX, c.scaleY, sh.typeofShape);
		
			add_remove(c, sh.typeofShape);
			if (tmrnAdded) {
		
				return contmrn.addChild(c);
		
			} else {
		
				hjbArrays.push(sh);
		
				return sbr.addChild(c);
			}
		
		
		
		}
		that.addShapeToKtb = addShapeToKtb;
		
		
		function removeHjb(index) {
		
			if (tmrnAdded) {
		
				contmrn.removeChildAt(contmrn.children.length - 1 - index);
		
			} else {
		
				sbr.removeChildAt(sbr.children.length - 1 - index);
		
			}
		}
		
		that.removeHjb = removeHjb;
		
		
		
		function getCont() {
		
			if (tmrnAdded) {
		
				return contmrn;
		
			} else return cont;
		
		}
		that.getCont = getCont;
		
		
		var btn_enable = [that.home, that.re_set, that.prv, that.next, that.goPage, that.plus, that.minus];
		
		function tool_enable(bool, blockType) {
		
		
			if (cont.mc && cont.mc_type == "sound" && blockType == 'tmrn') return;
			var alph = bool ? 1 : .3;
		
			if (blockType == 'tmrn' || blockType == 'zoom') {
		
				for (var i = 0; i < btn_enable.length; i++) {
		
					btn_enable[i].alpha = alph;
					btn_enable[i].mouseEnabled = bool;
		
				}
		
		
			}
		
			if (blockType == 'zoom') {
		
				that.tool_btn.alpha = alph;
				that.tool_btn.mouseEnabled = bool;
		
				that.book.alpha = alph;
				that.book.mouseEnabled = bool;
		
			}
		}
		
		that.tool_enable = tool_enable;
		
		
		function totam(evt) {
		
		
			blockChafaf();
			remove_settin();
		
			if (cont.mc_type != "sound") {
		
				cont.mouseEnabled = false;
				cont.stopDrag();
			}
			that.tool_enable(false, 'tmrn');
		
			sbr_tmrn = createNew_sbr('tmrn');
		
		
			addTmrn();
		
		};
		
		
		cont.totam = totam;
		
		
		
		
		
		
		function clearTmrn() {
		
		
			tmrnAdded = false;
		
			contmrn.removeAllChildren();
		
			that.tool_enable(true, 'tmrn');
		
			cont.startDrag();
		
			cont.mouseEnabled = true;
		
		
		
		}
		
		var Hjb = new lib.hijabTmrn();
		function drawHjb() {
		
		
			Hjb.clicked = false;
			Hjb.hijab_alpha.alpha = 1;
			Hjb.add_alpha.gotoAndStop(0);
		
			contmrn.addChild(Hjb);
		
			if (cont.mc_type == "sound") {
		
				Hjb.add_alpha.visible = true;
		
			} else Hjb.add_alpha.visible = false;
		}
		
		function addTmrn() {
		
			drawHjb();
		
			tmrnAdded = true;
		
			cont.mc.x = lib.properties["width"] / 2 - (cont.mc.getBounds().width / 2);
			cont.mc.y = lib.properties["height"] / 2 - (cont.mc.getBounds().height / 2);
		
			contmrn.addChild(cont.mc);
		
		
			setTimeout(function () {
		
		
		
				switch (cont.mc_type) {
		
					case "dnd":
						dnd_Manager(cont.mc);
						break;
		
					case "multi_dnd":
						multi_dnd_Manager(cont.mc);
						break;
		
					case "sil":
						silManager(cont.mc);
						break;
		
					case "text":
						textManager(cont.mc);
		
		
						break;
		
					case "sameColor":
						sameColorManager(cont.mc);
						break;
		
					case "anyColor":
						anyColorManager(cont.mc);
						break;
		
					case "color":
						colorManager(cont.mc);
						break;
		
					case "sound":
						soundManager(cont.mc);
						that.sound_sld.visible = true;
						that.settin_btn.visible = false;
						break;
		
					case "sound_fixe":
						soundManager(cont.mc);
						that.sound_sld.visible = true;
						that.settin_btn.visible = false;
						break;
		
					case "entour":
						entourManager(cont.mc);
		
						break
					case "lecture_z":
						lecture_zManager(cont.mc);
						break;
		
				}
		
			}, 500);
		
		}
		
		
		
		
		function videoManager(video_name) {
		
			cont.addVideo(video_name);
		
		}
		
		
		
		
		function lecture_zManager(lectureMc) {
		
		
			var stat;
			var lzArray = [];
		
			setTimeout(function () {
		
				get_Lz_mc();
		
		
				setlisteners();
		
		
			}, 0);
		
		
		
			function get_Lz_mc() {
		
		
				var parent = lectureMc;
				var keys = Object.keys(parent);
				var len = keys.length;
		
				while (--len) {
		
		
					if (keys[len].slice(0, 2) == ("lz")) {
		
						parent[keys[len]].name = keys[len];
		
						lzArray.push(parent[keys[len]]);
		
		
					}
				}
			}
		
			function setlisteners() {
		
				for (var p = 0; p < lzArray.length; p++) {
		
		
		
					lzArray[p].addEventListener('click', extCommunicate);
				}
			}
		
			function extCommunicate(evt) {
		
				if (evt.nativeEvent instanceof MouseEvent) {
					lectureMc.addChildAt(evt.currentTarget, lectureMc.numChildren - 1);
		
					if (!stat) {
						evt.currentTarget.gotoAndPlay(2)
						stat = true;
					} else {
						evt.currentTarget.gotoAndPlay(26);
						stat = false;
					}
				}
			}
		
			lectureMc.addEventListener("removed", removeListeners);
		
			function removeListeners(e) {
		
		
				for (var p = 0; p < lzArray.length; p++) {
		
		
		
					lzArray[p].removeEventListener('click', extCommunicate);
				}
		
				lectureMc.removeEventListener("removed", removeListeners);
			}
		}
		
		
		
		
		
		that.sound_sld.visible = false;
		if (!createjs.Sound.isReady()) {
		
			createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
		}
		
		var currentevent;
		var isfirst;
		var soundIsReady;
		var soundEnd;
		var duration;
		var frame_start_sound = 0;
		var on;
		that.music_btn_add = false;
		
		function soundManager(soundMc) {
		
		
			that.sound_sld.mov = soundMc;
			sout = soundMc.name;
		 totalFrm = soundMc.totalFrames;
		
		
			soundIsReady = false;
			on = false;
			isfirst = true;
			soundEnd = false;
		
			that.sound_sld.musicBtn.musicOn.visible = false;
			that.sound_sld.musicBtn.musicOff.visible = true;
			that.sound_sld.cursor.mouseEnabled = false;
		
			that.sound_sld.cursor.rate = 0;
		
		
		
			(function startSound() {
		
		
		
		
				createjs.Sound.alternateExtensions = ["ogg"];
				createjs.Sound.addEventListener("fileload", handleLoad);
		
				soundIsReady = createjs.Sound.registerSound("mysound/" + sout + ".mp3", "sound");
		
			})();
		
		
		
			function handleLoad(event) {
		
		
				soundIsReady = true;
		
			}
		
		
		
		
			if (!that.music_btn_add) {
				that.sound_sld.musicBtn.addEventListener("click", musicToggle);
				that.music_btn_add = true;
			}
		
			function musicToggle(eve) {
		
		
				if (eve.nativeEvent instanceof MouseEvent) {
		
					if (!on && soundIsReady === true) {
		
						that.sound_sld.musicBtn.musicOn.visible = true;
		
						that.sound_sld.musicBtn.musicOff.visible = false;
		
		
		
						if (isfirst) {
		
							that.music = createjs.Sound.play("sound");
		
		
		
							that.music.on("complete", handleComplete);
		
							duration = that.music.duration;
		
		
		
							isfirst = false;
		
		
						}
		
						that.sound_sld.mov.play();
		
						that.sound_sld.stopReceivingOnTickSound = false;
		
						if (soundEnd) {
		
							that.music.play();
		
							soundEnd = false;
						}
		
		
		
						resetSoundPosition(that.sound_sld.cursor.rate);
		
						that.music.paused = false;
		
						on = !on;
		
		
		
		
						that.sound_sld.cursor.mouseEnabled = true;
		
					} else if (on && soundIsReady === true) {
		
						that.sound_sld.musicBtn.musicOn.visible = false;
						that.sound_sld.musicBtn.musicOff.visible = true;
						that.music.paused = true;
						on = false;
		
						that.sound_sld.mov.stop();
		
						that.sound_sld.stopReceivingOnTickSound = true;
		
						that.sound_sld.cursor.mouseEnabled = false;
					}
				}
			}
		
		
			function resetSoundPosition(rate) {
		
				sound_position = duration * rate;
				if (isNaN(sound_position) || sound_position === Infinity) {
					sound_position = 0.1;
				}
		
				if (that.music !== null)
					that.music.position = sound_position ;
		
			}
		
			that.resetSoundPosition = resetSoundPosition;
		
		
		
			createjs.Ticker.on("tick", updateTRK);
		
			function updateTRK() {
		
				if (!isfirst) {
		
					that.sound_sld.cursor.resetTrk(that.music.position / duration ,  totalFrm );
		
				}
			}
		
		
			function handleComplete() {
		
				soundEnd = true;
		
				that.sound_sld.mov.gotoAndStop(frame_start_sound);
				that.sound_sld.cursor.mouseEnabled = false;
		
				that.sound_sld.musicBtn.musicOn.visible = false;
				that.sound_sld.musicBtn.musicOff.visible = true;
		
				on = false;
		
			}
		
			soundMc.addEventListener("removed", removeListeners);
		
			function removeListeners(e) {
				
		        that.sound_sld.stopReceivingOnTickSound = true;
				
				that.sound_sld.mov = null;
				createjs.Sound.stop();
		
				createjs.Sound.removeEventListener("fileload", handleLoad);
		
				soundMc.removeEventListener("removed", removeListeners);
		
		
				that.sound_sld.visible = false;
				that.settin_btn.visible = true;
		
			}
		
		
		
		
		}
		
		function colorManager(colorMc) {
		
			var allCorrect = true;
			var Complet = true;
		
			var lounArray = [];
			var forchatArray = [];
		
			var currentloun = 0;
		
			setTimeout(function () {
		
				getLounAndFourchat();
		
		
				setlisteners();
		
		
			}, 0);
		
		
		
			function getLounAndFourchat() {
		
		
				var parent = colorMc.correctbtn.parent;
				var keys = Object.keys(parent);
				var len = keys.length;
		
				while (--len) {
		
		
					if (keys[len].slice(1, 5) == ("loun")) {
		
						parent[keys[len]].name = keys[len];
		
						lounArray.push(parent[keys[len]]);
		
		
		
		
					} else if (keys[len].slice(0, 7) == ("forchat")) {
		
						parent[keys[len]].name = keys[len];
		
						forchatArray.push(parent[keys[len]]);
					}
		
		
				}
		
			}
		
		
		
			function setlisteners() {
		
				for (var u1 = 0; u1 < lounArray.length; u1++) {
		
		
					lounArray[u1].addEventListener("click", onloun);
		
				}
		
				for (var u = 0; u < forchatArray.length; u++) {
		
		
					forchatArray[u].addEventListener("click", onforchat);
		
				}
		
			}
		
			function removelisteners() {
		
				for (var u1 = 0; u1 < lounArray.length; u1++) {
		
		
					lounArray[u1].removeEventListener("click", onloun);
		
				}
		
				for (var u = 0; u < forchatArray.length; u++) {
		
		
					forchatArray[u].removeEventListener("click", onforchat);
		
				}
		
		
		
		
			}
		
			function onloun(e) {
		
				if (e.nativeEvent instanceof MouseEvent) {
		
					if (e.currentTarget.currentFrame !== 0) {
						e.currentTarget.gotoAndStop(0);
					} else e.currentTarget.gotoAndStop(currentloun);
				}
		
			}
			function onforchat(e) {
		
		
		
				for (var u = 0; u < forchatArray.length; u++) {
		
		
					forchatArray[u].gotoAndStop(0);
		
				}
				if (e != null) {
		
					currentloun = parseInt(e.currentTarget.name.slice(7));
					e.currentTarget.gotoAndPlay(1);
				}
			}
		
		
		
			colorMc.correctbtn.addEventListener("click", correct);
		
			function correct(ev) {
		
				colorMc.correctbtn.removeEventListener("click", correct);
				onforchat(null);
		
		
		
		
				allCorrect = true;
				Complet = true;
		
				for (var i = 0; i < lounArray.length; i++) {
		
					lounArray[i].removeEventListener("click", onloun);
		
					if (lounArray[i].name.slice(5, 6) != lounArray[i].currentFrame) {
		
						if (lounArray[i].currentFrame == 0) {
		
							Complet = false;
		
						} else {
		
							lounArray[i].gotoAndStop(lounArray[i].currentFrame + 20);
		
						}
						allCorrect = false;
					}
		
		
				}
		
				if (!Complet) {
		
					colorMc.correctbtn.gotoAndStop(2);
				}
				if (allCorrect) {
		
					colorMc.correctbtn.gotoAndStop(1);
		
		
				}
			}
		
		
		
			colorMc.replay.addEventListener("click", rply);
			function rply(ev) {
		
				colorMc.correctbtn.addEventListener("click", correct);
				colorMc.correctbtn.gotoAndStop(0);
				setlisteners();
		
				currentloun = 0;
				onforchat(null);
		
				for (var u1 = 0; u1 < lounArray.length; u1++) {
		
		
					lounArray[u1].gotoAndStop(0);
		
				}
		
			}
		
			colorMc.addEventListener("removed", oncolorRemove);
			function oncolorRemove(ev) {
		
		
		
				colorMc.correctbtn.removeEventListener("click", correct);
				colorMc.replay.removeEventListener("click", rply);
				removelisteners();
				colorMc.removeEventListener("removed", oncolorRemove);
			}
		
		
		}
		
		
		
		
		
		function anyColorManager(anycolorMc) {
		
			var allCorrect = true;
			var Complet = true;
		
			var lounArray = [];
			var forchatArray = [];
		
			var currentloun = 0;
		
			setTimeout(function () {
		
				getLounAndFourchat();
		
		
				setlisteners();
		
		
			}, 0);
		
		
			function getLounAndFourchat() {
		
		
				var parent = anycolorMc.correctbtn.parent;
				var keys = Object.keys(parent);
				var len = keys.length;
		
				while (--len) {
		
		
					if (keys[len].slice(1, 5) == ("loun")) {
		
						parent[keys[len]].name = keys[len];
		
						lounArray.push(parent[keys[len]]);
		
		
		
		
					} else if (keys[len].slice(0, 7) == ("forchat")) {
		
						parent[keys[len]].name = keys[len];
		
						forchatArray.push(parent[keys[len]]);
					}
		
		
				}
		
			}
		
		
		
			function setlisteners() {
		
				for (var u1 = 0; u1 < lounArray.length; u1++) {
		
		
					lounArray[u1].addEventListener("click", onloun);
		
				}
		
				for (var u = 0; u < forchatArray.length; u++) {
		
		
					forchatArray[u].addEventListener("click", onforchat);
		
				}
			}
		
			function removelisteners() {
		
				for (var u1 = 0; u1 < lounArray.length; u1++) {
		
		
					lounArray[u1].removeEventListener("click", onloun);
		
				}
		
				for (var u = 0; u < forchatArray.length; u++) {
		
		
					forchatArray[u].removeEventListener("click", onforchat);
		
				}
		
		
				anycolorMc.replay.removeEventListener("click", rply);
		
		
				anycolorMc.correctbtn.removeEventListener("click", correct);
		
			}
			setlisteners();
		
		
			function onloun(e) {
		
				if (e.nativeEvent instanceof MouseEvent) {
		
					if (e.currentTarget.currentFrame !== 0) {
						e.currentTarget.gotoAndStop(0);
					} else e.currentTarget.gotoAndStop(currentloun);
				}
		
			}
			function onforchat(e) {
		
		
		
				for (var u = 0; u < forchatArray.length; u++) {
		
		
					forchatArray[u].gotoAndStop(0);
		
				}
				if (e != null) {
		
					currentloun = parseInt(e.currentTarget.name.slice(7));
					e.currentTarget.gotoAndPlay(1);
				}
			}
		
		
		
			anycolorMc.correctbtn.addEventListener("click", correct);
		
			function correct(ev) {
		
				anycolorMc.correctbtn.removeEventListener("click", correct);
				onforchat(null);
		
		
		
				allCorrect = true;
				Complet = true;
		
				for (var i = 0; i < lounArray.length; i++) {
		
					lounArray[i].removeEventListener("click", onloun);
		
					if (lounArray[i].currentFrame == 0 && lounArray[i].name.slice(5, 6) != "x") {
		
						Complet = false;
		
					}
					if (lounArray[i].currentFrame != 0 && lounArray[i].name.slice(5, 6) == "x") {
		
						lounArray[i].gotoAndStop(lounArray[i].currentFrame + 20);
		
						allCorrect = false;
					}
		
		
				}
		
				if (!Complet && allCorrect) {
		
					anycolorMc.correctbtn.gotoAndStop(2);
				} else if (allCorrect && Complet) {
		
					anycolorMc.correctbtn.gotoAndStop(1);
		
		
				}
			}
		
		
		
			anycolorMc.replay.addEventListener("click", rply);
			function rply(ev) {
		
				anycolorMc.correctbtn.addEventListener("click", correct);
				anycolorMc.correctbtn.gotoAndStop(0);
				setlisteners();
		
		
				for (var u1 = 0; u1 < lounArray.length; u1++) {
		
		
					lounArray[u1].gotoAndStop(0);
		
				}
		
			}
		
			anycolorMc.addEventListener("removed", onAnyColorRemove);
			function onAnyColorRemove(ev) {
		
		
				removelisteners();
		
		
				anycolorMc.removeEventListener("removed", onAnyColorRemove);
		
			}
		
		
		
		}
		
		
		
		
		
		
		function sameColorManager(sameColorMc) {
		
		
			var allCorrect = true;
			var Complet = true;
		
			var lounArray = [];
			var forchatArray = [];
		
			var lawnCodeArray = [];
			var lawnIntArray = [];
		
			var currentloun = 0;
		
			setTimeout(function () {
		
				getLounAndFourchat();
		
		
				setlisteners();
		
		
			}, 0);
		
		
			function getLounAndFourchat() {
		
		
				var parent = sameColorMc.correctbtn.parent;
				var keys = Object.keys(parent);
				var len = keys.length;
		
				while (--len) {
		
		
					if (keys[len].slice(1, 5) == ("LOUN")) {
		
						parent[keys[len]].name = keys[len];
		
						lounArray.push(parent[keys[len]]);
		
		
		
		
					} else if (keys[len].slice(0, 7) == ("forchat")) {
		
						parent[keys[len]].name = keys[len];
		
						forchatArray.push(parent[keys[len]]);
					}
		
		
				}
		
			}
		
		
		
			function setlisteners() {
		
				for (var u1 = 0; u1 < lounArray.length; u1++) {
		
		
					lounArray[u1].addEventListener("click", onloun);
		
				}
		
				for (var u = 0; u < forchatArray.length; u++) {
		
		
					forchatArray[u].addEventListener("click", onforchat);
		
				}
		
		
			}
		
			function removelisteners() {
		
				for (var u1 = 0; u1 < lounArray.length; u1++) {
		
		
					lounArray[u1].removeEventListener("click", onloun);
		
				}
		
				for (var u = 0; u < forchatArray.length; u++) {
		
		
					forchatArray[u].removeEventListener("click", onforchat);
		
				}
		
				sameColorMc.replay.removeEventListener("click", rply);
		
		
				sameColorMc.correctbtn.removeEventListener("click", correct);
		
			}
		
		
			setlisteners();
		
		
		
		
			function onloun(e) {
		
		
				if (e.nativeEvent instanceof MouseEvent) {
		
					if (e.currentTarget.currentFrame !== 0) {
						e.currentTarget.gotoAndStop(0);
					} else e.currentTarget.gotoAndStop(currentloun);
				}
		
		
			}
			function onforchat(e) {
		
		
		
				for (var u = 0; u < forchatArray.length; u++) {
		
		
					forchatArray[u].gotoAndStop(0);
		
				}
				if (e != null) {
		
					currentloun = parseInt(e.currentTarget.name.slice(7));
					e.currentTarget.gotoAndPlay(1);
		
				}
			}
		
		
		
		
			sameColorMc.correctbtn.addEventListener("click", correct);
		
			function correct(ev) {
		
				sameColorMc.correctbtn.removeEventListener("click", correct);
				onforchat(null);
		
		
				allCorrect = true;
				Complet = true;
		
				for (var i = 0; i < lounArray.length; i++) {
		
		
					lounArray[i].removeEventListener("click", onloun);
		
					var lawnCode = lounArray[i].name.slice(5, 6);
					var lawnInt = lounArray[i].currentFrame;
					var thisLawnCode = true;
		
					if (lawnCodeArray.indexOf(lawnCode) === -1) {
						lawnCodeArray.push(lawnCode);
		
		
						if (lounArray[i].currentFrame == 0 && lawnCode !== "x") {
							Complet = false;
		
							continue;
						}
		
		
		
		
		
						for (var j = 1 + i; j < lounArray.length; j++) {
		
		
							if (lounArray[j].name.slice(5, 6) == lawnCode) {
								if (lounArray[j].currentFrame == 0 && lawnCode != "x") {
		
									thisLawnCode = false;
									allCorrect = false;
									Complet = false;
									break;
								}
		
		
								if (lounArray[j].currentFrame !== lawnInt || lawnIntArray.indexOf(lawnInt) !== -1) {
		
		
									thisLawnCode = false;
									allCorrect = false;
		
		
		
									makeAsFalse(lawnCode);
									break;
		
		
								}
		
							}
		
						}
						if (thisLawnCode) {
							if (lawnInt != 0) {
								lawnIntArray.push(lawnInt);
							}
		
						}
					}
				}
				if (!Complet) {
		
					sameColorMc.correctbtn.gotoAndStop(2);
				}
				if (allCorrect && Complet) {
		
					sameColorMc.correctbtn.gotoAndStop(1);
		
		
		
				}
			}
		
		
		
			sameColorMc.replay.addEventListener("click", rply);
			function rply(ev) {
		
				sameColorMc.correctbtn.addEventListener("click", correct);
				sameColorMc.correctbtn.gotoAndStop(0);
		
				setlisteners();
		
				onforchat(null);
		
				for (var u1 = 0; u1 < lounArray.length; u1++) {
		
		
					lounArray[u1].gotoAndStop(0);
		
				}
		
				currentloun = 0;
				lawnIntArray.splice(0);
				lawnCodeArray.splice(0);
				allCorrect = true;
		
		
			}
		
		
			function makeAsFalse(wrongMC) {
		
				if (wrongMC === "x") {
		
					makeAsFalseForX();
		
					return;
				}
		
				for (var i = 0; i < lounArray.length; i++) {
					if (lounArray[i].name.slice(5, 6) === wrongMC) {
		
						lounArray[i].gotoAndStop(lounArray[i].currentFrame + 20);
					}
				}
		
		
			}
		
		
			function makeAsFalseForX() {
		
				for (var i = 0; i < lounArray.length; i++) {
					if (lounArray[i].name.slice(5, 6) === "x" && lounArray[i].currentFrame !== 0) {
						lounArray[i].gotoAndStop(lounArray[i].currentFrame + 20);
					}
				}
			}
		
			sameColorMc.addEventListener("removed", onColorRemove);
			function onColorRemove(ev) {
		
		
		
				removelisteners();
		
		
				sameColorMc.removeEventListener("removed", onColorRemove);
		
			}
		
		
		}
		
		
		that.active_input;
		function setChar(character) {
		
			if (!that.active_input) return;
		
			var st = that.active_input.value;
			that.active_input.value = st + character;
			that.active_input.focus();
		}
		that.setChar = setChar;
		
		function remove_Char() {
		
			if (!that.active_input) return;
		
			var st = that.active_input.value;
		
			var start = that.active_input.selectionStart;
			var distanc = start - 1;
		
			var selectionValue = st.slice(0, start - 1) + st.slice(start);
		
			if (start != that.active_input.selectionEnd) {
				selectionValue = st.slice(0, start) + st.slice(start + 1, that.active_input.selectionEnd);
				distanc = start;
			}
			that.active_input.value = selectionValue;
			that.active_input.focus();
		
			that.active_input.setSelectionRange(distanc, distanc);
		
		
		}
		that.remove_Char = remove_Char;
		
		
		function isFocus(ev) {
			that.active_input = ev.currentTarget;
		}
		
		function textManager(txtMc) {
		
			txtMc.isListener = false;
		
		
			var complet = true;
			var allTrue_txt = true;
			var txtArray = [];
		
			getTxt();
		
			setlisteners();
		
			initTextStyle();
		
		
		
			function getTxt() {
		
		
				var parent = txtMc.correctbtn.parent;
				var keys = Object.keys(parent);
				var len = keys.length;
		
				while (--len) {
		
		
		
		
					if (keys[len].slice(1, 4) === ("TXT")) {
		
		
		
						document.getElementById(keys[len]).insName = keys[len];
		
		
		
						txtArray.push(document.getElementById(keys[len]));
		
		
					}
				}
		
		
			}
		
		
			function setlisteners() {
		
				if (!txtMc.isListener) {
		
					for (var y = 0; y < txtArray.length; y++) {
		
						txtArray[y].addEventListener("focus", isFocus);
					}
		
		
					txtMc.correctbtn.addEventListener("click", onTxtcorrect);
					txtMc.replay.addEventListener("click", txtreply);
		
		
		
		
					txtMc.isListener = true;
				}
		
		
			}
		
		
			function removeListeners() {
		
		
				txtMc.correctbtn.removeEventListener("click", onTxtcorrect);
				txtMc.replay.removeEventListener("click", txtreply);
		
				txtMc.isListener = false;
		
		
		
			}
		
		
			function initTextStyle() {
		
		
				for (var t = 0; t < txtArray.length; t++) {
		
					txtArray[t].style.color = '#000000';
					txtArray[t].style.fontSize = font_size;
					txtArray[t].style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
		
		
				}
		
		
			}
		
		
			function onTxtcorrect() {
		
		
		
				txtMc.correctbtn.removeEventListener("click", onTxtcorrect);
		
				for (var u = 0; u < txtArray.length; u++) {
		
					var rr = txtArray[u].insName.slice(4).toLowerCase();
		
					rr = rr.replace(/__/g, "-");
		
					rr = rr.replace(/_a_/g, " ");
		
					rr = rr.replace(/bb/g, ",");
		
					rr = rr.replace(/cc/g, "<");
		
					rr = rr.replace(/dd/g, ">");
		
					rr = rr.replace(/pp/g, "+");
		
					rr = rr.replace(/_t_/g, "=");
		
					rr = rr.replace(/nn/g, "-");
		
					rr = rr.replace(/ff/g, "×");
		
					rr = rr.replace(/ss/g, "/");
		
					rr = rr.replace(/kk/g, ".");
		
					rr = rr.replace(/qq/g, "(");
		
					rr = rr.replace(/xx/g, ")");
		
					rr = rr.replace(/vv/g, "'");
		
		
					var correct_array = rr.split("ww");
		
		
					if (txtArray[u].value.toLowerCase() == '' && correct_array.indexOf('') < 0) {
						complet = false;
		
					}
		
					if (correct_array.indexOf(txtArray[u].value.toLowerCase()) < 0) {
		
						txtArray[u].style.color = '#ff0000';
						allTrue_txt = false;
		
					} else {
						txtArray[u].style.color = '#008000';
		
					}
				}
		
				if (!complet) {
		
					txtMc.correctbtn.gotoAndStop(2);
		
				}
				if (allTrue_txt && complet) {
		
		
					txtMc.correctbtn.gotoAndStop(1);
				}
		
			}
			function txtreply() {
		
		
				txtMc.correctbtn.addEventListener("click", onTxtcorrect);
				txtMc.correctbtn.gotoAndStop(0);
				allTrue_txt = true;
				complet = true;
		
				initTextStyle();
		
				for (var u = 0; u < txtArray.length; u++) {
		
					txtArray[u].value = "";
		
				}
			}
		
			txtMc.addEventListener("removed", onTxtRemove);
			function onTxtRemove(ev) {
		
		
		
				removeListeners();
		
		
		
				txtArray.splice(0);
				txtMc.removeEventListener("removed", onTxtRemove);
		
			}
		
		
		}
		
		
		
		function silManager(silMc) {
		
		
			var oldObject, pt, overObject, numOfLink = 0,
				strngOfLinkDown, strngCode1, strngCode2, RorL;
			var downOnAcceptedMc, isListener, lineToErase, currentUpMc, mmc, ismove;
		
			var allTrue = true;
			var complet = true;
			var linkArray = [];
			var TwomcArray = [];
			var mc1Array = [];
			var mc2Array = [];
			var that = silMc;
		
		
		
		
			setTimeout(function () {
		
				getLink();
		
		
				setlisteners();
		
		
			}, 0);
		
		
			that.shapeDraw = new createjs.Shape();
			that.shapeDraw0 = new createjs.Shape();
		
			that.shapeDraw.cache(0, 0, 1200, 950);
		
		
			function getLink() {
		
		
				var parent = silMc.correctbtn.parent;
				var keys = Object.keys(parent);
				var len = keys.length;
		
				while (--len) {
		
		
					if (keys[len].slice(1, 6) == ("LINKT") || keys[len].slice(1, 6) == ("LINKL")) {
		
						numOfLink += Math.floor(keys[len].slice(6).length / 2);
		
		
					}
		
					if (keys[len].slice(1, 5) === ("LINK")) {
		
		
		
						parent[keys[len]].name = keys[len];
		
						linkArray.push(parent[keys[len]]);
					}
				}
		
		
			}
		
			function setlisteners() {
		
		
				if (!that.isListener) {
		
		
		
					for (var l = 0; l < linkArray.length; l++) {
		
						linkArray[l].addEventListener("mousedown", ondown);
		
		
		
					}
		
					that.addEventListener("pressup", onup);
		
		
					that.isListener = true;
				}
		
		
			}
		
			function removelisteners() {
		
		
				for (var l = 0; l < linkArray.length; l++) {
		
		
					linkArray[l].removeEventListener("mousedown", ondown);
		
		
		
				}
		
				that.removeEventListener("pressup", onup);
		
		
		
				that.isListener = false;
		
			}
		
		
		
			var sbr = new createjs.Container();
		
			sbr.x = 0;
			sbr.y = 0;
		
		
		
			sbr.mouseEnabled = false;
			that.addChildAt(sbr, 1);
		
		
			sbr.addChild(that.shapeDraw);
		
			sbr.addChild(that.shapeDraw0);
		
		
			function drawLine(oldObject, newObject, color) {
		
				var col = (typeof color === 'undefined') ? "#000000" : color;
		
				that.shapeDraw0.graphics.beginStroke(col)
		
				.setStrokeStyle(3, "round")
		
				.moveTo(oldObject.x + AddRorL(oldObject).x, oldObject.y + AddRorL(oldObject).y)
		
				.lineTo(newObject.x + AddRorL(newObject).x, newObject.y + AddRorL(newObject).y);
		
		
				stage.update();
		
			}
			function onpressmove_sil(evt) {
		
		
				ismove = true;
		
				pt = sbr.globalToLocal(evt.stageX, evt.stageY);
		
				that.shapeDraw.graphics.clear();
		
				that.shapeDraw.graphics.beginStroke("#000000")
		
				.setStrokeStyle(3, "round")
		
				.moveTo(mmc.x + AddRorL(mmc).x, mmc.y + AddRorL(mmc).y)
		
				.lineTo(pt.x, pt.y);
		
		
		
				that.shapeDraw.updateCache();
		
			}
		
			var currentHit_sil = null;
			function checkHit_sil(pt) {
		
				var rect = {
		
					x: pt.x,
					y: pt.y,
				}
		
		
				for (var u = 0; u < linkArray.length; u++) {
		
		
		
					var rect2 = linkArray[u];
		
					if ((Math.abs(rect.x - rect2.x) < rect2.getTransformedBounds().width / 2) && Math.abs(rect.y - rect2.y) < (rect2.getTransformedBounds().height / 2)) {
		
		
		
						currentHit_sil = rect2;
						return true;
					}
				}
		
		
				return false;
			}
		
			function onup(ev) {
		
		
				that.removeEventListener("pressmove", onpressmove_sil);
		
				that.shapeDraw.graphics.clear();
				that.shapeDraw.updateCache();
		
		
				checkHit_sil(sbr.globalToLocal(ev.stageX, ev.stageY));
		
		
				if ((currentHit_sil) != null && downOnAcceptedMc && ismove) {
		
					ismove = false;
					overObject = currentHit_sil;
					mmc = overObject;
		
		
					var currentUpMc = mmc.name;
		
		
					var strngOfLinkUp = currentUpMc.slice(1, 6);
					strngCode2 = currentUpMc.slice(6, 8);
		
					TwomcArray[1] = mmc;
		
		
					if (strngOfLinkDown == strngOfLinkUp) {
		
						return;
					}
		
		
		
					if (strngCode1 == strngCode2) {
		
		
					}
		
					verifyAndStoreMc();
		
				}
		
				downOnAcceptedMc = false;
				currentHit_sil = null;
			}
		
		
		
		
		
			function ondown(ev) {
		ev.nativeEvent.preventDefault();
		
				downOnAcceptedMc = true;
		
				mmc = ev.currentTarget;
		
				that.addEventListener("pressmove", onpressmove_sil);
		
				currentDownMc = mmc.name;
		
		
				strngOfLinkDown = currentDownMc.slice(1, 6);
				strngCode1 = currentDownMc.slice(6, 8);
		
		
		
				RorL = currentDownMc.slice(5, 6);
		
		
		
				TwomcArray[0] = mmc;
		
		
		
		
			}
		
		
		
			function verifyAndStoreMc() {
		
		
		
				if (areLinked()) {
					eraseLine();
					return;
				}
		
		
		
		
				drawLine(TwomcArray[1], TwomcArray[0]);
		
				var s1 = TwomcArray[0].name.slice(1, 6);
				var s2 = TwomcArray[1].name.slice(1, 6);
		
				if (s1 == "LINKL" || s1 == "LINKT") {
					mc1Array.push(TwomcArray[0]);
				} else {
					mc2Array.push(TwomcArray[0]);
		
				}
		
				if (s2 == "LINKL" || s2 == "LINKT") {
					mc1Array.push(TwomcArray[1]);
				} else {
					mc2Array.push(TwomcArray[1]);
		
				}
			}
		
			function areLinked() {
		
				for (var d = 0; d < mc1Array.length; d++) {
		
					if (mc1Array[d].name == TwomcArray[1].name && TwomcArray[0].name == mc2Array[d].name || mc1Array[d].name == TwomcArray[0].name && TwomcArray[1].name == mc2Array[d].name) {
						lineToErase = d;
						return true;
					}
				}
				return false;
			}
		
		
			function eraseLine() {
		
		
				that.shapeDraw0.graphics.clear();
		
		
				for (var i = 0; i < mc1Array.length; i++) {
					if (lineToErase != i) {
		
						drawLine(mc1Array[i], mc2Array[i]);
					}
				}
				mc1Array.splice(lineToErase, 1);
				mc2Array.splice(lineToErase, 1);
		
			}
		
			silMc.correctbtn.addEventListener("click", oncorrect.bind(this));
		
		
			function oncorrect(ev) {
		
		
				silMc.correctbtn.removeEventListener("click", oncorrect);
		
				removelisteners();
		
		
				for (var i = 0; i < mc1Array.length; i++) {
		
					if (!(mc1Array[i].name.slice(6, 8) == mc2Array[i].name.slice(6, 8) || mc1Array[i].name.slice(8, 10) == mc2Array[i].name.slice(6, 8))) {
		
						drawLine(mc1Array[i], mc2Array[i], "#ff0000");
						allTrue = false;
		
					} else {
		
						drawLine(mc1Array[i], mc2Array[i], "#008000");
		
					}
				}
		
		
				if (mc1Array.length < numOfLink) {
		
					complet = false;
		
				}
		
				if (!complet) {
		
					silMc.correctbtn.gotoAndStop(2);
				}
				if (mc1Array.length == numOfLink && allTrue) {
		
		
					silMc.correctbtn.gotoAndStop(1);
		
				}
		
		
			}
		
		
			silMc.replay.addEventListener("click", rply.bind(this));
		
			function rply(ev) {
		
				that.shapeDraw.graphics.clear();
				that.shapeDraw0.graphics.clear();
		
				silMc.correctbtn.gotoAndStop(0);
		
		
				setlisteners();
		
		
				currentDownMc = null;
				mmc = null;
				allTrue = true;
				complet = true;
				mc1Array.splice(0);
				mc2Array.splice(0);
		
				TwomcArray.splice(0);
		
			}
			function AddRorL(MCC) {
		
				var dist = {};
		
				var ts = MCC.name.slice(5, 6);
		
				if (ts === "L") {
		
					dist.x = MCC.getTransformedBounds().width / 2;
					dist.y = 0;
		
				} else if (ts === "R") {
		
					dist.x = 0 - MCC.getTransformedBounds().width / 2;
					dist.y = 0;
				}
		
		
				if (ts === "T") {
		
					dist.x = 0;
					dist.y = MCC.getTransformedBounds().height / 2;
		
				} else if (ts === "B") {
		
					dist.x = 0;
					dist.y = 0 - MCC.getTransformedBounds().height / 2;
				}
		
				return dist;
			}
		
		
			that.addEventListener("removed", onRemove);
		
			function onRemove(ev) {
		
		
				that.correctbtn.removeEventListener("click", oncorrect);
				that.replay.removeEventListener("click", rply);
				removelisteners();
				that.removeEventListener("removed", onRemove);
			}
		
		
		}
		
		
		
		
		
		
		
		
		function entourManager(entourMc) {
		
			var allCorrect = true;
			var complet = true;
		
			var KlkArray = [];
		
		
			setTimeout(function () {
		
				getKLK();
		
		
				setlisteners();
		
		
			}, 0);
		
		
		
			function getKLK() {
		
		
				var parent = entourMc.correctbtn.parent;
				var keys = Object.keys(parent);
				var len = keys.length;
		
				while (--len) {
		
		
					if (keys[len].slice(1, 4) == ("KLK")) {
		
						parent[keys[len]].name = keys[len];
		
						KlkArray.push(parent[keys[len]]);
		
		
		
		
					}
		
		
				}
		
			}
		
		
		
			function setlisteners() {
		
				for (var u1 = 0; u1 < KlkArray.length; u1++) {
		
		
					KlkArray[u1].addEventListener("click", onKLK);
		
				}
		
		
			}
		
			function removelisteners() {
		
				for (var u1 = 0; u1 < KlkArray.length; u1++) {
		
		
					KlkArray[u1].removeEventListener("click", onKLK);
		
				}
		
		
		
		
		
		
			}
		
		
			function onKLK(e) {
		
				if (e.nativeEvent instanceof MouseEvent) {
					e.currentTarget.gotoAndStop(e.currentTarget.currentFrame == 0 ? 1 : 0);
				}
		
			}
		
		
		
		
			entourMc.correctbtn.addEventListener("click", correct);
		
			function correct(ev) {
		
				entourMc.correctbtn.removeEventListener("click", correct);
		
		
		
				var true_mc = 0;
				var non_clicked = 0;
				complet = true;
				allCorrect = true;
		
		
				for (var c = 0; c < KlkArray.length; c++) {
					if (KlkArray[c].name.slice(4, 5) == 'T') {
		
						true_mc += 1;
					}
					if (KlkArray[c].currentFrame == 0) {
		
						non_clicked += 1;
					}
				}
		
				var mc_clicked = KlkArray.length - non_clicked;
				complet = (mc_clicked - true_mc >= 0);
		
		
				for (var i = 0; i < KlkArray.length; i++) {
		
					KlkArray[i].removeEventListener("click", onKLK);
		
					if (KlkArray[i].name.slice(4, 5) != 'T' && KlkArray[i].currentFrame == 1 || KlkArray[i].name.slice(4, 5) != 'F' && KlkArray[i].currentFrame == 0) {
		
		
						allCorrect = false;
		
						if (KlkArray[i].currentFrame == 0) continue;
		
						KlkArray[i].gotoAndStop(3);
		
					} else if (KlkArray[i].name.slice(4, 5) == 'T' && KlkArray[i].currentFrame == 1) {
		
						KlkArray[i].gotoAndStop(2);
					}
		
				}
		
				if (!complet) {
		
					entourMc.correctbtn.gotoAndStop(2);
				}
				if (allCorrect && complet) {
		
					entourMc.correctbtn.gotoAndStop(1);
		
		
		
				}
			}
		
		
		
			entourMc.replay.addEventListener("click", rply);
			function rply(ev) {
		
				entourMc.correctbtn.addEventListener("click", correct);
				entourMc.correctbtn.gotoAndStop(0);
				setlisteners();
		
		
				for (var u1 = 0; u1 < KlkArray.length; u1++) {
		
		
					KlkArray[u1].gotoAndStop(0);
		
				}
		
			}
		
			entourMc.addEventListener("removed", onEntourRemove);
			function onEntourRemove(ev) {
		
		
		
				entourMc.correctbtn.removeEventListener("click", correct);
				entourMc.replay.removeEventListener("click", rply);
				removelisteners();
				entourMc.removeEventListener("removed", onEntourRemove);
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		function multi_dnd_Manager(multi_dndMc) {
		
			setTimeout(function () {
		
				getdnd();
		
		
			}, 0);
		
			function getdnd() {
		
		
				var parent = multi_dndMc.dnd1.parent;
				var keys = Object.keys(parent);
				var len = keys.length;
		
				while (--len) {
		
		
					if (keys[len].slice(0, 3) == ("DND")) {
		
						dnd_Manager(parent[keys[len]]);
					}
				}
		
			}
		
		
		}
		
		
		
		
		
		
		
		
		function dnd_Manager(dndMc) {
		
		
		
			var wrong_mc = [];
			var mc_droped = 0,
				numOfDND = 0;
		
			var draggedArray = [];
		
			var currentHit;
			var currentHitString;
		
			var dropArray = [];
		
			var used_dropArray = [];
		
			setTimeout(function () {
		
				getDrag();
		
		
				setlisteners();
		
		
			}, 0);
		
		
		
			function getDrag() {
		
		
				var parent = dndMc.correctbtn.parent;
				var keys = Object.keys(parent);
				var len = keys.length;
		
				while (--len) {
		
		
					if (keys[len].slice(1, 4) == ("dnd")) {
		
		
		
						parent[keys[len]].name = keys[len];
		
						parent[keys[len]].regX = parent[keys[len]].width / 2;
						parent[keys[len]].regY = parent[keys[len]].height / 2;
		
						parent[keys[len]].startx = parent[keys[len]].x;
						parent[keys[len]].starty = parent[keys[len]].y;
		
						draggedArray.push(parent[keys[len]]);
		
		
		
		
					} else if (keys[len].slice(1, 4) == ("trg")) {
		
						numOfDND++;
		
						parent[keys[len]].name = keys[len];
						parent[keys[len]].regX = parent[keys[len]].width / 2;
						parent[keys[len]].regY = parent[keys[len]].height / 2;
		
						dropArray.push(parent[keys[len]]);
					}
		
		
				}
		
			}
		
		
		
			function setlisteners() {
		
				for (var u1 = 0; u1 < draggedArray.length; u1++) {
		
		
		
					draggedArray[u1].addEventListener("mousedown", onmousedown);
					draggedArray[u1].addEventListener("pressup", onpressup);
					draggedArray[u1].addEventListener("pressmove", onpressmove);
		
				}
		
		
			}
		
		
		
			function removelisteners() {
		
				for (var u1 = 0; u1 < draggedArray.length; u1++) {
		
		
		
					draggedArray[u1].removeEventListener("mousedown", onmousedown);
					draggedArray[u1].removeEventListener("pressup", onpressup);
					draggedArray[u1].removeEventListener("pressmove", onpressmove);
		
				}
		
		
			}
		
		
			dndMc.correctbtn.addEventListener("click", oncorrect);
			function oncorrect(evt) {
		
				dndMc.correctbtn.removeEventListener("click", oncorrect);
		
				correct();
		
			}
		
			dndMc.replay.addEventListener("click", rply);
		
			function rply(ev) {
		
				setlisteners();
		
				for (var u1 = 0; u1 < draggedArray.length; u1++) {
		
					draggedArray[u1].gotoAndStop(0);
					draggedArray[u1].x = draggedArray[u1].startx;
					draggedArray[u1].y = draggedArray[u1].starty;
				}
		
				for (var g = 0; g < dropArray.length; g++) {
		
					dropArray[g].gotoAndStop(0);
		
				}
		
				wrong_mc.splice(0);
				used_dropArray.splice(0);
				mc_droped = 0;
		
				dndMc.correctbtn.gotoAndStop(0);
				dndMc.correctbtn.addEventListener("click", oncorrect);
			}
		
		
		
		
		
			function onmousedown(e) {
		
		
		
				e.nativeEvent.preventDefault();
		
		
			}
		
		
		
			function onpressmove(evt) {
		
		
				evt.nativeEvent.preventDefault();
		
		
				evt.currentTarget.parent.addChildAt(evt.currentTarget, evt.currentTarget.parent.numChildren - 1);
		
				var pt = dndMc.globalToLocal(evt.stageX, evt.stageY);
		
				evt.currentTarget.x = pt.x;
				evt.currentTarget.y = pt.y;
		
				stage.update();
		
		
			}
		
			function onpressup(evt) {
		
				stage.preventSelection = false;
		
				var isHit = false;
		
		
		
		
		
				isHit = checkHit(evt.currentTarget);
		
				if (isHit) {
		
					evt.currentTarget.x = currentHit.x;
					evt.currentTarget.y = currentHit.y;
		
		
					used_dropArray.push(currentHitString);
					currentHit.gotoAndStop(2);
		
					mc_droped++;
					checkCorrect(evt.currentTarget, currentHit);
		
					evt.currentTarget.removeEventListener("pressup", onpressup);
					evt.currentTarget.removeEventListener("pressmove", onpressmove);
		
				} else {
		
					returntoFirstplace(evt.currentTarget);
		
				}
		
			}
		
			function checkCorrect(draged, droped) {
		
				if (draged.name.slice(4) !== droped.name.slice(4)) {
		
		
		
					wrong_mc.push(droped);;
		
				}
		
			}
		
			function correct() {
		
				for (var g = 0; g < wrong_mc.length; g++) {
		
					wrong_mc[g].gotoAndStop(1);
					wrong_mc[g].parent.setChildIndex(wrong_mc[g], wrong_mc[g].parent.numChildren - 1);
		
				}
		
		
				if (numOfDND === mc_droped && wrong_mc.length === 0) {
		
		
		
					dndMc.correctbtn.gotoAndStop(1);
				}
		
		
		
			}
			function checkHit(obj) {
		
				var rect = {
		
					x: obj.x,
					y: obj.y,
					width: obj.getBounds().width,
					height: obj.getBounds().height
				}
		
		
				for (var u = 0; u < dropArray.length; u++) {
		
		
		
					var rect2 = dropArray[u];
		
					if (Math.abs(rect.x - rect2.x) < (rect.width / 2 + rect2.getBounds().width / 2) && Math.abs(rect.y - rect2.y) < (rect.height / 2 + rect2.getBounds().height / 2)) {
		
						if (used_dropArray.indexOf(dropArray[u].name) > -1) return false;
						currentHitString = rect2.name;
		
						currentHit = rect2;
						return true;
					}
				}
		
		
				return false;
			}
		
		
			function returntoFirstplace(mc) {
		
		
				mc.x = mc.startx;
				mc.y = mc.starty;
		
			}
		
			dndMc.addEventListener("removed", onDNDRemove);
			function onDNDRemove(ev) {
		
		
		
				dndMc.correctbtn.removeEventListener("click", oncorrect);
				dndMc.replay.removeEventListener("click", rply);
				removelisteners();
				dndMc.removeEventListener("removed", onDNDRemove);
			}
		
		
		
			/*createjs.Ticker.addEventListener("tick", tick);
		
		
			function tick(event) {
		
				 
		
			}
			var queue = new createjs.LoadQueue(false);
			queue.on("complete", function (event) {
		
				var image = queue.getResult("imgDND");
		
				var bmp = new createjs.Bitmap(image);
		
		
				bmp.cache(0, 0, image.width, image.height, 0.4);
		
				 
				var bmp = new createjs.Bitmap(bmp.cacheCanvas);
		
				dndMc.addChildAt(bmp, 0);
		
		
			});
			queue.loadFile({
				src: "ff.png",
				id: "imgDND"
			});*/
		
		}
		
		
		
		
		
		
		
		
		cont.addVideo = addVideo;
		cont.scr = "";
		
		function Delete() {
		
			parent.style.display = 'none';
			grand_father.style.display = 'none';
		
			vid.pause();
		}
		
		
		function addVideo(video_name) {
		
		
			source.setAttribute('src', 'video/' + video_name + '.mp4');
		
			vid.load();
		
			vid.play();
		
		
			parent.style.display = 'block';
			grand_father.style.display = 'block';
		
		
		
		
		}
		
		
		
		
		function dragElement(elmnt) {
			var pos1 = 0,
				pos2 = 0,
				pos3 = 0,
				pos4 = 0;
			if (document.getElementById(elmnt.id + "header")) {
		
				document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
			} else {
		
				elmnt.onmousedown = dragMouseDown;
			}
		
			function dragMouseDown(e) {
				e = e || window.event;
				e.preventDefault();
		
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
		
				document.onmousemove = elementDrag;
			}
		
			function elementDrag(e) {
				e = e || window.event;
				e.preventDefault();
		
				pos1 = pos3 - e.clientX;
				pos2 = pos4 - e.clientY;
				pos3 = e.clientX;
				pos4 = e.clientY;
		
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			}
		
			function closeDragElement(e) {
		
				document.onmouseup = null;
				document.onmousemove = null;
			}
		}
		
		
		
		
		
		var oldX, oldY, pts;
		
		var hjbArrays = [];
		var store_hjb_shapeArray = [];
		var isMove = false;
		var sbr;
		var store_sbr = {};
		var sbr_tmrn;
		
		that.isListenerAndVar;
		
		
		that.tool.isErase = false;
		that.tool.is_feutre = false;
		that.tool.color = "#000000";
		that.tool.f_color = "#008000";
		that.tool.current_f_color = 1;
		that.tool.currentcolor = 1;
		that.tool.currentsomk = 2;
		that.tool.somk = 3;
		
		
		
		that.tool.drawSquare;
		that.tool.drawCircle;
		
		
		function toTools(ev) {
		
			if (ev.nativeEvent instanceof MouseEvent) {
				if (is_tool_clicked) {
		
					end_tool();
		
				} else {
		
					that.blockChafaf();
					ev.currentTarget.gotoAndPlay(1);
					that.tool.gotoAndPlay(1);
		
					is_tool_clicked = true;
					startTool();
				}
			}
		
		}
		
		
		
		function createNew_sbr(type = 'ktb') {
		
		
			var drect = new createjs.Shape();
			drect.name = 'drect';
		
			drect.mouseEnabled = false;
		
		
			var dcir = new createjs.Shape();
			dcir.name = 'dcir';
		
			dcir.mouseEnabled = false;
		
		
			var shapeDraw = new createjs.Shape();
			shapeDraw.name = 'shapeDraw';
		
			shape_draw_x = type === 'ktb' ? 0 : 60;
			shape_draw_y = type === 'ktb' ? 0 : 30;
		
			shape_draw_w = type === 'ktb' ? 700 : 900;
			shape_draw_h = type === 'ktb' ? 500 : 500;
		
			shapeDraw.cache(shape_draw_x, shape_draw_y, shape_draw_w, shape_draw_h);
		
			var f_shapeDraw = new createjs.Shape();
			f_shapeDraw.name = 'f_shapeDraw';
		
			f_shapeDraw.cache(shape_draw_x, shape_draw_y, shape_draw_w, shape_draw_h);
		
		
		
		
			var n_sbr = new createjs.Container();
			n_sbr.name = 'sbr';
			n_sbr.addChild(drect);
		
		
			n_sbr.addChild(dcir);
		
		
			n_sbr.addChild(shapeDraw);
			n_sbr.addChild(f_shapeDraw);
			f_shapeDraw.alpha = 0.4;
		
			var rect = new createjs.Shape();
			rect.graphics.beginFill("#f00");
			rect.graphics.drawRect(shape_draw_x, shape_draw_y, firstwidth == 0 ? shape_draw_w : shape_draw_w,
				firstheight == 0 ? shape_draw_h : shape_draw_h);
			rect.graphics.endFill();
		
			n_sbr.hitArea = rect;
		
			return n_sbr;
		}
		
		
		function add_sbr_listener(new_sbr) {
		
			new_sbr.addEventListener("mousedown", sbr_on_mousedown);
			new_sbr.addEventListener("pressup", sbr_on_pressup);
			new_sbr.addEventListener("mouseout", sbr_on_mouseout);
		
		}
		
		
		
		
		
		
		
		
		
		
		(function setlisteners() {
		
			if (!that.isListenerAndVar) {
		
		
				oldX = 0, oldY = 0, pt = 0, cursor = 0;
		
				that.tool.qalam.addEventListener("click", kom);
				that.tool.feutre.addEventListener("click", f_kom);
				that.tool.mimsaha.addEventListener("click", kom1);
				that.tool.somkmc.addEventListener("click", kom2);
		
				that.tool.square.addEventListener("click", toSquare);
				that.tool.circle.addEventListener("click", toCircle);
		
		
		
				that.tool.qalam.addEventListener("mouseover", tool_overBtn);
				that.tool.qalam.addEventListener("rollout", tool_outBtn);
		
				that.tool.feutre.addEventListener("mouseover", tool_overBtn);
				that.tool.feutre.addEventListener("rollout", tool_outBtn);
		
		
		
				that.tool.mimsaha.addEventListener("mouseover", tool_overBtn);
				that.tool.mimsaha.addEventListener("rollout", tool_outBtn);
		
		
		
				that.tool.somkmc.addEventListener("mouseover", tool_overBtn);
				that.tool.somkmc.addEventListener("rollout", tool_outBtn);
		
				that.tool.square.addEventListener("mouseover", tool_overBtn);
				that.tool.square.addEventListener("rollout", tool_outBtn);
		
				that.tool.circle.addEventListener("mouseover", tool_overBtn);
				that.tool.circle.addEventListener("rollout", tool_outBtn);
		
		
				that.isListenerAndVar = true;
		
		
			}
		
		
		
		
		
		
		})();
		
		function tool_overBtn(ev) {
			ev.currentTarget.bkg.alpha = ev.currentTarget.bkg.alpha == 1 ? 1 : 0.2;
		}
		function tool_outBtn(ev) {
			ev.currentTarget.bkg.alpha = ev.currentTarget.bkg.alpha == 1 ? 1 : 0.6;
		}
		
		
		function startTool() {
		
			reset_tool_window();
		
			that.tool.circle.bkg.alpha = 0.6;
			that.tool.square.bkg.alpha = 0.6;
			that.tool.feutre.bkg.alpha = 0.6;
			that.tool.qalam.bkg.alpha = 1;
			that.tool.mimsaha.bkg.alpha = 0.6;
			that.tool.somkmc.bkg.alpha = 0.6;
		
			if (that.getCont() === cont) {
		
				add_sbr_listener(sbr);
			} else {
		
				contmrn.addChild(sbr_tmrn);
				add_sbr_listener(sbr_tmrn);
		
		
		
			}
		
		
		
			cont.stopDrag();
		}
		
		function makeCursor(px, py) {
		
		
			if (!sbr.contains(cursor)) {
		
				cursor = new createjs.Shape();
				cursor.graphics.beginFill("#ffffff");
				cursor.graphics.drawCircle(0, 0, that.tool.somk * 2);
				cursor.cursor = "pointer";
		
		
				sbr.addChild(cursor);
			}
		
		
		
			cursor.x = px;
			cursor.y = py;
		
		
		
		}
		
		
		
		function drawSq(evt) {
		
			var sbr = evt.currentTarget;
			pt = sbr.globalToLocal(evt.stageX, evt.stageY);
		
		
			if (Math.abs(oldX - pt.x) > 6 || Math.abs(oldY - pt.y) > 6) {
		
				isMove = true;
		
			}
		
			sbr.getChildByName('drect').graphics.clear();
		
		
			sbr.getChildByName('drect').graphics.beginFill("#525252");
			sbr.getChildByName('drect').graphics.drawRect(oldX, oldY, pt.x - oldX, pt.y - oldY);
			sbr.getChildByName('drect').graphics.endFill();
		
			stage.update();
		
		}
		function drawCi(evt) {
		
			var sbr = evt.currentTarget;
			pt = sbr.globalToLocal(evt.stageX, evt.stageY);
		
			if (Math.abs(oldX - pt.x) > 6 || Math.abs(oldY - pt.y) > 6) {
		
				isMove = true;
		
			}
		
			sbr.getChildByName('dcir').graphics.clear();
		
		
			sbr.getChildByName('dcir').graphics.beginFill("#525252");
			sbr.getChildByName('dcir').graphics.drawCircle(oldX, oldY, Math.max(Math.abs(pt.x - oldX), Math.abs(pt.y - oldY)));
			sbr.getChildByName('dcir').graphics.endFill();
		
			stage.update();
		
		}
		
		function sbr_onpressmove(evt) {
		
		
			var sbr = evt.currentTarget;
			if (that.tool.drawSquare) {
		
				drawSq(evt);
				return;
			}
		
		
			if (that.tool.drawCircle) {
		
				drawCi(evt);
				return;
			}
		
			isMove = true;
		
			pt = sbr.globalToLocal(evt.stageX, evt.stageY);
		
			if (oldX) {
		
		
				if (that.tool.isErase) {
					sbr.getChildByName('f_shapeDraw').graphics.beginStroke(that.tool.f_color)
		
					.setStrokeStyle(that.tool.somk * 3
		
						, "round")
		
					.moveTo(oldX, oldY)
		
					.lineTo(pt.x, pt.y);
		
					sbr.getChildByName('f_shapeDraw').updateCache("destination-out");
		
					sbr.getChildByName('f_shapeDraw').graphics.clear();
		
		
					sbr.getChildByName('shapeDraw').graphics.beginStroke(that.tool.color)
		
					.setStrokeStyle(that.tool.isErase ? that.tool.somk * 3 : that.tool.somk
		
						, "round")
		
					.moveTo(oldX, oldY)
		
					.lineTo(pt.x, pt.y);
		
					sbr.getChildByName('shapeDraw').updateCache("destination-out");
		
					sbr.getChildByName('shapeDraw').graphics.clear();
				} else {
		
					if (that.tool.is_feutre) {
						sbr.getChildByName('f_shapeDraw').graphics.beginStroke(that.tool.f_color)
		
						.setStrokeStyle(that.tool.somk * 3
		
							, "round")
		
						.moveTo(oldX, oldY)
		
						.lineTo(pt.x, pt.y);
		
						sbr.getChildByName('f_shapeDraw').updateCache("source-over");
		
						sbr.getChildByName('f_shapeDraw').graphics.clear();
					} else {
						sbr.getChildByName('shapeDraw').graphics.beginStroke(that.tool.color)
		
						.setStrokeStyle(that.tool.isErase ? that.tool.somk * 3 : that.tool.somk
		
							, "round")
		
						.moveTo(oldX, oldY)
		
						.lineTo(pt.x, pt.y);
		
						sbr.getChildByName('shapeDraw').updateCache("source-over");
		
						sbr.getChildByName('shapeDraw').graphics.clear();
					}
		
				}
		
			}
		
		
			if (that.tool.isErase) {
		
				makeCursor(pt.x, pt.y);
		
			}
		
			oldX = pt.x;
		
			oldY = pt.y;
		
			//stage.update(); is not necessary ,ticker is sifficient
		
		}
		
		function sbr_on_mouseout(evt) {
			var sbr = evt.currentTarget;
		
			isMove = false;
		
			sbr.removeEventListener("pressmove", sbr_onpressmove);
		
			sbr.removeChild(cursor);
		}
		
		
		cont.on("click", function (evt) {
		
		
			if (isMove) return;
			var pt = that.getCont().globalToLocal(evt.stageX, evt.stageY);
			var ol = that.getCont().localToLocal(pt.x, pt.y, that.getCont());
		
		
		
			for (var r = 0; r < hjbArrays.length; r++) {
		
		
				if (Math.abs(hjbArrays[r].x - ol.x) < 10 && Math.abs(hjbArrays[r].y - ol.y) < 10) {
		
		
					that.removeHjb(hjbArrays.length - 1 - r);
		
					hjbArrays.splice(r, 1);
				}
			}
		});
		
		
		
		
		
		
		function sbr_on_pressup(evt) {
		
			var sbr = evt.currentTarget;
			isMove = false;
		
			sbr.removeEventListener("pressmove", sbr_onpressmove);
		
			sbr.removeChild(cursor);
			var pt = sbr.globalToLocal(evt.stageX, evt.stageY);
			var ptcir0 = sbr.localToLocal(pt.x, pt.y, that.getCont());
			var ol = sbr.localToLocal(oldX, oldY, that.getCont());
		
			if (that.tool.drawSquare) {
		
		
		
		
				sbr.getChildByName('drect').graphics.clear();
		
				var coor = {};
				coor.typeofShape = "square";
				coor.width = ptcir0.x - ol.x;
				coor.height = ptcir0.y - ol.y;
		
				coor.x = ol.x;
				coor.y = ol.y;
		
				if (Math.abs(coor.width) > 15) {
		
					addShape(coor);
		
				}
		
			}
		
		
		
			if (that.tool.drawCircle) {
		
				sbr.getChildByName('dcir').graphics.clear();
		
		
				var coor = {};
				coor.typeofShape = "circle";
				coor.x = ol.x;
				coor.y = ol.y;
				coor.width = Math.abs(ptcir0.x - ol.x);
				coor.height = Math.abs(ptcir0.y - ol.y);
		
				if (Math.abs(coor.width) > 15 || Math.abs(coor.height) > 15) {
		
		
					addShape(coor);
		
				}
		
			}
		
		
		}
		
		
		function addShape(shape) {
		
			that.addShapeToKtb(shape);
		
		
		
		}
		
		
		function sbr_on_mousedown(evt) {
		
			var sbr = evt.currentTarget;
			evt.nativeEvent.preventDefault();
		
		
		
			sbr.addEventListener("pressmove", sbr_onpressmove);
		
			reset_tool_window();
		
			pt = sbr.globalToLocal(evt.stageX, evt.stageY);
		
			oldX = pt.x;
		
			oldY = pt.y;
		
		
			if (!that.tool.drawCircle && !that.tool.drawSquare && !that.tool.is_feutre) {
		
				sbr.getChildByName('shapeDraw').graphics.beginStroke(that.tool.color)
		
				.setStrokeStyle(that.tool.somk, "round")
		
				.moveTo(oldX, oldY)
		
				.lineTo(oldX + 1, oldY + 1);
		
				sbr.getChildByName('shapeDraw').updateCache(that.tool.isErase ? "destination-out" : "source-over");
		
				sbr.getChildByName('shapeDraw').graphics.clear();
		
			} else if (!that.tool.drawCircle && !that.tool.drawSquare && that.tool.is_feutre) {
		
				sbr.getChildByName('f_shapeDraw').graphics.beginStroke(that.tool.f_color)
		
				.setStrokeStyle(that.tool.somk * 3, "round")
		
				.moveTo(oldX, oldY)
		
				.lineTo(oldX + 1, oldY + 1);
		
				sbr.getChildByName('f_shapeDraw').updateCache(that.tool.isErase ? "destination-out" : "source-over");
		
				sbr.getChildByName('f_shapeDraw').graphics.clear();
			}
		
		
			stage.update();
		}
		
		function reset_tool_window() {
			that.tool.qalam.reset();
			that.tool.feutre.reset();
		
		
			that.tool.somkmc.reset();
			that.tool.mimsaha.reset();
		
		
		
		}
		
		
		function f_kom(eve) {
		
		
			if (eve.nativeEvent instanceof MouseEvent) {
		
		
				that.tool.is_feutre = true;
				that.tool.isErase = false;
		
				that.tool.feutre.bkg.alpha = 1;
				that.tool.qalam.bkg.alpha = 0.6;
				that.tool.mimsaha.bkg.alpha = 0.6;
				that.tool.circle.bkg.alpha = 0.6;
				that.tool.square.bkg.alpha = 0.6;
		
				that.tool.qalam.gotoAndStop(that.tool.currentcolor);
				that.tool.mimsaha.gotoAndStop(1);
				that.tool.somkmc.gotoAndStop(that.tool.currentsomk);
		
				that.tool.drawCircle = false;
				that.tool.drawSquare = false;
		
		
			}
		}
		function kom(eve) {
		
		
			if (eve !== null && eve.nativeEvent instanceof MouseEvent) {
		
		
				that.tool.is_feutre = false;
				that.tool.isErase = false;
		
				that.tool.feutre.bkg.alpha = 0.6;
				that.tool.qalam.bkg.alpha = 1;
				that.tool.mimsaha.bkg.alpha = 0.6;
				that.tool.circle.bkg.alpha = 0.6;
				that.tool.square.bkg.alpha = 0.6;
		
				that.tool.feutre.gotoAndStop(that.tool.current_f_color);
				that.tool.mimsaha.gotoAndStop(1);
				that.tool.somkmc.gotoAndStop(that.tool.currentsomk);
		
				that.tool.drawCircle = false;
				that.tool.drawSquare = false;
			}
		
		}
		
		that.kom = kom;
		function kom1(eve) {
		
			if (eve.nativeEvent instanceof MouseEvent) {
		
		
				that.tool.isErase = true;
		
				that.tool.drawCircle = false;
				that.tool.drawSquare = false;
		
				that.tool.feutre.bkg.alpha = 0.6;
				eve.currentTarget.bkg.alpha = 1;
				that.tool.qalam.bkg.alpha = 0.6;
				that.tool.circle.bkg.alpha = 0.6;
				that.tool.square.bkg.alpha = 0.6;
		
				that.tool.feutre.gotoAndStop(that.tool.current_f_color);
				that.tool.qalam.gotoAndStop(that.tool.currentcolor);
				that.tool.somkmc.gotoAndStop(that.tool.currentsomk);
		
		
			}
		}
		
		
		function kom2(eve) {
		
			if (eve.nativeEvent instanceof MouseEvent) {
		
		
		
		
		
				that.tool.feutre.gotoAndStop(that.tool.current_f_color);
				that.tool.qalam.gotoAndStop(that.tool.currentcolor);
				that.tool.mimsaha.gotoAndStop(that.tool.mimsaha.currentFrame < 3 ? that.tool.mimsaha.currentFrame : 1);
		
		
			}
		}
		function toSquare(eve) {
		
			if (eve.nativeEvent instanceof MouseEvent) {
		
		
				that.tool.feutre.bkg.alpha = 0.6;
				eve.currentTarget.bkg.alpha = 1;
				that.tool.qalam.bkg.alpha = 0.6;
				that.tool.mimsaha.bkg.alpha = 0.6;
				that.tool.circle.bkg.alpha = 0.6;
		
		
		
				that.tool.feutre.gotoAndStop(that.tool.current_f_color);
				that.tool.qalam.gotoAndStop(that.tool.currentcolor);
				that.tool.mimsaha.gotoAndStop(1);
				that.tool.somkmc.gotoAndStop(that.tool.currentsomk);
		
				that.tool.drawSquare = !that.tool.drawSquare;
		
		
				that.tool.drawCircle = false;
		
		
			}
		}
		function toCircle(eve) {
		
			if (eve.nativeEvent instanceof MouseEvent) {
		
				that.tool.feutre.bkg.alpha = 0.6;
				eve.currentTarget.bkg.alpha = 1;
				that.tool.qalam.bkg.alpha = 0.6;
				that.tool.mimsaha.bkg.alpha = 0.6;
				that.tool.square.bkg.alpha = 0.6;
		
				that.tool.feutre.gotoAndStop(that.tool.current_f_color);
				that.tool.qalam.gotoAndStop(that.tool.currentcolor);
				that.tool.mimsaha.gotoAndStop(1);
				that.tool.somkmc.gotoAndStop(that.tool.currentsomk);
		
				that.tool.drawCircle = !that.tool.drawCircle;
		
				that.tool.drawSquare = false;
		
		
			}
		}
		
		function end_tool() {
		
			is_tool_clicked = false;
		
			cont.startDrag();
		
		
		
		
		
		
		
			that.tool.mimsaha.gotoAndStop(0);
			that.tool.somkmc.gotoAndStop(that.tool.currentsomk);
			that.tool.qalam.gotoAndStop(that.tool.currentcolor);
		
		
			that.tool.is_feutre = false;
			that.tool.isErase = false;
			that.tool.drawCircle = false;
			that.tool.drawSquare = false;
		
		
			sbr.removeAllEventListeners();
			if (tmrnAdded) sbr_tmrn.removeAllEventListeners();
		
		
		
		
			that.unblockChafaf();
		
			that.tool_btn.gotoAndStop(0);
			that.tool.gotoAndStop(0);
		}
		
		
		
		
		
		
		
		
		
		
		var is_settin_ListenerAndVar;
		
		(function set_settin_listeners() {
		
			if (!that.is_settin_ListenerAndVar) {
		
		
		
				that.settin.eye_tmrn.addEventListener("click", toeye);
				that.settin.default_menu.addEventListener("click", toDefault_menu);
		
				that.settin.full_eye.addEventListener("click", tofull);
		
		
		
				that.settin.eye_tmrn.addEventListener("mouseover", overBtn);
				that.settin.eye_tmrn.addEventListener("rollout", outBtn);
		
				that.settin.default_menu.addEventListener("mouseover", overBtn);
				that.settin.default_menu.addEventListener("rollout", outBtn);
		
		
				that.settin.full_eye.addEventListener("mouseover", overBtn);
				that.settin.full_eye.addEventListener("rollout", outBtn);
		
				that.is_settin_ListenerAndVar = true;
		
		
			}
		
		
		
		
		
		
		})();
		
		
		var is_settin_clicked = false;
		function toSettin(ev) {
		
			if (ev.nativeEvent instanceof MouseEvent) {
				if (is_settin_clicked) {
		
					remove_settin();
		
				} else {
		
					is_settin_clicked = true;
					that.settin.gotoAndPlay(1);
				}
			}
		
		}
		var is_eye_clicked = false;
		function toeye(ev) {
		
			if (ev.nativeEvent instanceof MouseEvent) {
				if (!is_eye_clicked) {
					that.blockChafaf();
					chafaf.visible = false;
					is_eye_clicked = true;
		
					that.settin.eye_tmrn.gotoAndStop(1);
		
				} else {
					that.unblockChafaf();
					chafaf.visible = true;
					is_eye_clicked = false;
		
					that.settin.eye_tmrn.gotoAndStop(0);
				}
			}
		
		}
		var isDefault_menu = false;
		function toDefault_menu(ev) {
		
			if (ev.nativeEvent instanceof MouseEvent) {
				if (isDefault_menu) {
					reset_menu();
					isDefault_menu = false;
					that.settin.default_menu.gotoAndStop(0);
		
				} else {
					set_ui();
					isDefault_menu = true;
					that.settin.default_menu.gotoAndStop(1);
				}
			}
		
		}
		
		
		
		
		var elem = document.documentElement;
		
		
		function openFullscreen() {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			}
		}
		
		
		function closeFullscreen() {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
		
		
		var is_full_clicked = false;
		function tofull(ev) {
		
			if (ev.nativeEvent instanceof MouseEvent) {
				if (!is_full_clicked) {
		
					is_full_clicked = true;
		
					openFullscreen();
		
					that.settin.full_eye.gotoAndStop(1);
		
				} else {
		
					is_full_clicked = false;
		
					closeFullscreen();
		
					that.settin.full_eye.gotoAndStop(0);
				}
			}
		
		}
		
		
		
		
		
		/////////////  zoomtamrin + mask cont ///////////////////////////////////////////
		
		
		
		
		
		function parentmask(ob, scale_used) {
		
		
		
		
			var pt = ob.parent.localToLocal(ob.x, ob.y, that);
		
			var dim0 = cont.localToLocal(0, 0, that);
		
			var dim = cont.localToLocal(ob.getTransformedBounds().width * scalx,
				ob.getTransformedBounds().height * scaly, that);
		
			var msk = new createjs.Shape();
		
		
			//var c = ob.x * xx * (used * plus) + diffX - (ob.getTransformedBounds().width * xx) * (used * plus) * 0.5;
			//var g = ob.y * yy * (used * plus) + diffY - (ob.getTransformedBounds().height * yy) * (used * plus) * 0.5;
		
			//msk.graphics.beginFill("#ff000050").drawRect(c, g, ob.getTransformedBounds().width*xx * used * plus, ob.getTransformedBounds().height *yy* used * plus);
			msk.graphics.beginFill("00ff0090").drawRect(pt.x - 2, pt.y - 2,
				dim.x - dim0.x, dim.y - dim0.y);
		
			// that.addChild(msk);   
			cont.mask = msk;
		
		}
		function parentScale(ob) {
		 console.log('start of  parentScale');
			var xx = scalx;
			var yy = scaly;
		
		
			var shape = new createjs.Shape();
		
			var facWidth = cont.getBounds().width / (ob.getTransformedBounds().width * xx);
			var facHeight = cont.getBounds().height / (ob.getTransformedBounds().height * yy);
		
			var used = Math.min(facWidth, facHeight);
		
			console.log(" that.parent.getBounds().width  " + cont.getBounds().height);
			console.log(" ob.getTransformedBounds().width  " + ob.getTransformedBounds().height * xx);
			toslidrScal(used - 1);
		        stage.update();
		        console.log('start of  parentmask');
			parentmask(ob, used - 1);
			console.log('end of  parentmask');
			
		
		}
		that.parentScale = parentScale;
		
		
		///////////////////////   zoom tool ///////////////////////////////////
		
		
		var maxZoom = 28;
		var currentPosition = 0;
		var rate = 0;
		
		
		function onPlus(ev) {
		
			console.log('OnPlus');
			if (currentPosition < maxZoom) {
		
				scal_page(4);
			}
		}
		
		function onMinus(ev) {
		
			if (currentPosition > 0) {
		
				scal_page(-4);
			}
		}
		
		function scal_page(scalMainusAndPlus) {
			console.log('from scal_page scal ', scalMainusAndPlus);
		
			//To prevent quick drag of trk by the user ,we send "dispatchEvent("change")" for eadch mini change of trk.x 
			for (var i = 0; i < Math.abs(scalMainusAndPlus); i++) {
		
				var diff = scalMainusAndPlus > 0 ? 1 : -1;
		
				console.log('from trkRate rate = ', rate);
				if (currentPosition > -1 && currentPosition < maxZoom + 1) {
		
					currentPosition += diff;
		
					trkRate(currentPosition);
		
					toslidrScal(rate);
		
					//that.dispatchEvent("change");
		
		
				}
		
			}
		
		
		
		}
		
		cont.scal = scal_page;
		
		function trkRate(currentPos) {
		
			var cur = currentPos < 0 ? 0 : currentPos > maxZoom ? maxZoom : currentPos;
			rate = cur / maxZoom * 2;
			console.log('rate');
		}
		
		function resetTrk() {
		
		
			currentPosition = 0;
			rate = 0;
		
		
		}
		
		
		
		
		function toslidrScal(rate) {
		
			scalfactor = 1 + rate;
		
			cont.scaleX = scalfactor;
		
			cont.scaleY = scalfactor;
		
			if (scaleFac > scalfactor) {
		
				repositionContainer();
			}
		
			scaleFac = scalfactor;
		}
		
		
		
		
		function toreset(evt) {
		
		
			cont.regX = cont.origin_regX;
			cont.regY = cont.origin_regY;
		
			cont.scaleX = 1;
			cont.scaleY = 1;
		
		
			scaleFac = 0;
		
			cont.x = firstwidth / 2 + offsetX;
			cont.y = firstheight / 2 + offsetY;
		
			resetTrk();
		
		}
		
		cont.toreset = toreset;
		
		
		function repositionContainer() {
		
		
			var diff = (cont.x - (firstwidth / 2 + offsetX));
		
			cont.x = cont.x - diff * (1 / (currentPosition + 1));
		
		
		
			diff = (cont.y - (firstheight / 2 + offsetY));
		
			cont.y = cont.y - diff * (1 / (currentPosition + 1));
		
		
		}
		
		
		
		///////////////////////////  end zoom tool /////////////////////////////////////
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// page_load
	this.page_loader = new lib.PAGEloaDER();
	this.page_loader.name = "page_loader";
	this.page_loader.setTransform(459.9,239.65,1.2823,1.0721,0,0,0,-28.9,-7.3);

	this.timeline.addTween(cjs.Tween.get(this.page_loader).wait(1));

	// goPage
	this.goPage = new lib.goToPgcopy();
	this.goPage.name = "goPage";
	this.goPage.setTransform(107.7,2.7,1.1197,0.7198,0,0,0,-2.5,-20.8);

	this.timeline.addTween(cjs.Tween.get(this.goPage).wait(1));

	// pageNum
	this.pageNum = new lib.an_TextInput({'id': 'pageNum', 'value':'', 'disabled':false, 'visible':true, 'class':'ui-textinput'});

	this.pageNum.name = "pageNum";
	this.pageNum.setTransform(131.65,5.3,0.4191,1.1015,0,0,0,0,0.3);

	this.timeline.addTween(cjs.Tween.get(this.pageNum).wait(1));

	// sound_sld
	this.sound_sld = new lib.Symbol38();
	this.sound_sld.name = "sound_sld";
	this.sound_sld.setTransform(519.65,476,1,1,0,0,0,0.8,0);

	this.timeline.addTween(cjs.Tween.get(this.sound_sld).wait(1));

	// book
	this.book = new lib.Symbol7_1();
	this.book.name = "book";
	this.book.setTransform(979,16.85,1,0.887);

	this.timeline.addTween(cjs.Tween.get(this.book).wait(1));

	// zoomsBtn
	this.minus = new lib.Symbol3_1();
	this.minus.name = "minus";
	this.minus.setTransform(987.35,450.4,0.9367,1);

	this.plus = new lib.Symbol2();
	this.plus.name = "plus";
	this.plus.setTransform(987.35,488.85,0.9367,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.plus},{t:this.minus}]}).wait(1));

	// next
	this.next = new lib.pageapre();
	this.next.name = "next";
	this.next.setTransform(1002.3,241.85,0.9485,1.6154,0,0,0,17.4,0.8);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(1));

	// prv
	this.prv = new lib.pageavant();
	this.prv.name = "prv";
	this.prv.setTransform(-3.05,241.85,0.9538,1.6154,0,0,180,17.4,0.8);

	this.timeline.addTween(cjs.Tween.get(this.prv).wait(1));

	// re_set
	this.re_set = new lib.Symbol6();
	this.re_set.name = "re_set";
	this.re_set.setTransform(984.55,407.5,0.7622,1);

	this.timeline.addTween(cjs.Tween.get(this.re_set).wait(1));

	// home
	this.home = new lib.Symbol4();
	this.home.name = "home";
	this.home.setTransform(939.45,15.75,1,0.8925);

	this.timeline.addTween(cjs.Tween.get(this.home).wait(1));

	// tool_btn
	this.tool_btn = new lib.tool_btn();
	this.tool_btn.name = "tool_btn";
	this.tool_btn.setTransform(-1.15,480.8,0.8588,1,0,0,0,-18,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.tool_btn).wait(1));

	// settin_btn
	this.settin_btn = new lib.settin_btn();
	this.settin_btn.name = "settin_btn";
	this.settin_btn.setTransform(53.5,15.4,1,0.887);

	this.timeline.addTween(cjs.Tween.get(this.settin_btn).wait(1));

	// tools
	this.tool = new lib.tool();
	this.tool.name = "tool";
	this.tool.setTransform(-3,280.8,0.7492,1,90,0,0,0.1,34.2);

	this.timeline.addTween(cjs.Tween.get(this.tool).wait(1));

	// settin
	this.settin = new lib.settin();
	this.settin.name = "settin";
	this.settin.setTransform(28.5,99.35);

	this.timeline.addTween(cjs.Tween.get(this.settin).wait(1));

	// greytool
	this.grey_tool = new lib.grey_tool();
	this.grey_tool.name = "grey_tool";
	this.grey_tool.setTransform(1002.3,249.6,1.0135,1,0,0,0,1000,249.5);

	this.timeline.addTween(cjs.Tween.get(this.grey_tool).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(460.6,249.9,541.9,249.20000000000002);
// library properties:
lib.properties = {
	id: '2034D714F5551F45A41B5E1BA58D4A37',
	width: 1000,
	height: 500,
	fps: 24,
	color: "#DBDBDB",
	opacity: 1.00,
	manifest: [
		{src:"images/boook.jpg?1631462190503", id:"boook"},
		{src:"images/CachedBmp_53.png?1631462190503", id:"CachedBmp_53"},
		{src:"images/CachedBmp_5.png?1631462190503", id:"CachedBmp_5"},
		{src:"images/CachedBmp_4.png?1631462190503", id:"CachedBmp_4"},
		{src:"images/new tool_atlas_1.png?1631462190362", id:"new tool_atlas_1"},
		{src:"images/new tool_atlas_2.png?1631462190362", id:"new tool_atlas_2"},
		{src:"images/new tool_atlas_3.png?1631462190362", id:"new tool_atlas_3"},
		{src:"images/new tool_atlas_4.png?1631462190362", id:"new tool_atlas_4"},
		{src:"images/new tool_atlas_5.png?1631462190362", id:"new tool_atlas_5"},
		{src:"images/new tool_atlas_6.png?1631462190364", id:"new tool_atlas_6"},
		{src:"https://code.jquery.com/jquery-3.4.1.min.js?1631462190503", id:"lib/jquery-3.4.1.min.js"},
		{src:"components/sdk/anwidget.js?1631462190503", id:"sdk/anwidget.js"},
		{src:"components/ui/src/textinput.js?1631462190503", id:"an.TextInput"},
		{src:"components/ui/src/textinput.js?1631462190503", id:"an.TextInput"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2034D714F5551F45A41B5E1BA58D4A37'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
function _updateVisibility(evt) {
	if((this.stage == null || this._off || this._lastAddedFrame != this.parent.currentFrame) && this._element && this._element._attached) {
		this._element.detach();
		stage.removeEventListener('drawstart', this._updateVisibilityCbk);
		this._updateVisibilityCbk = false;
	}
}
function _handleDrawEnd(evt) {
	if(this._element && this._element._attached) {
		var props = this.getConcatenatedDisplayProps(this._props), mat = props.matrix;
		var tx1 = mat.decompose(); var sx = tx1.scaleX; var sy = tx1.scaleY;
		var dp = window.devicePixelRatio || 1; var w = this.nominalBounds.width * sx; var h = this.nominalBounds.height * sy;
		mat.tx/=dp;mat.ty/=dp; mat.a/=(dp*sx);mat.b/=(dp*sx);mat.c/=(dp*sy);mat.d/=(dp*sy);
		this._element.setProperty('transform-origin', this.regX + 'px ' + this.regY + 'px');
		var x = (mat.tx + this.regX*mat.a + this.regY*mat.c - this.regX);
		var y = (mat.ty + this.regX*mat.b + this.regY*mat.d - this.regY);
		var tx = 'matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + x + ',' + y + ')';
		this._element.setProperty('transform', tx);
		this._element.setProperty('width', w);
		this._element.setProperty('height', h);
		this._element.update();
	}
}

function _tick(evt) {
	this._lastAddedFrame = this.parent.currentFrame;
	var stage = this.stage;
	stage&&stage.on('drawend', this._handleDrawEnd, this, true);
	if(!this._updateVisibilityCbk) {
		this._updateVisibilityCbk = stage.on('drawstart', this._updateVisibility, this, false);
	}
}
function _componentDraw(ctx) {
	if(this._element && !this._element._attached) {
		this._element.attach($('#dom_overlay_container'));
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
