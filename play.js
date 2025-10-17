function setupVideo(){
    var player = videojs("my-video");

    //urlパラメータ取得
    /* 
    urlパラメータは以下の形式
    ?videoId
    または
    ?v=videoId
    */
    var videoId = ""
    const param = window.location.search
    if (param.length==0){
        console.log('urlパラメータがありません')
        return
    }
    if (! param.includes('=')){
        // urlパラメータが?videoIdの場合
        videoId = param.substring(1)
    } else{
        // urlパラメータが?v=videoIdの場合
        const searchParams = new URLSearchParams(param)
        if (searchParams.has('v')) {
            videoId = searchParams.get('v')
        }else{
            console.log('videoIdが指定されていません')
            return
        }
    }

    var videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    //json読み込み
    fetch("sub-table.json")
        .then((response) => response.json())
        .then((subTable) => {
            if (! (videoId in subTable)){
                console.log(`videoId:${videoId}がテーブルにありません`)
                return
            } 
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
}
setupVideo()