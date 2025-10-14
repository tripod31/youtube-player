var player = videojs("my-video");

//html引数受け取り
var videoId = location.href.split("?")[1];
var videoUrl = `https://www.youtube.com/watch?v=${videoId}`

//json読み込み
fetch("sub-table.json")
	.then((response) => response.json())
	.then((subTable) => {
        var subFile = subTable[videoId]
        document.title = subFile.split('.').slice(0, -1).join('.')
        var subFilePath= 'sub/' + subFile

        player.src({
            src: videoUrl,
            type: "video/youtube",
        });

        player.addRemoteTextTrack({
            kind: "captions",
            src: subFilePath,
            srclang: "ja",
            label: "japanese",
        });

        player.textTracks()[0].mode='showing'
});
