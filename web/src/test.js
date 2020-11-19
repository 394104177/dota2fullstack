let res = {
    dmg:{
        all:{
            all:{
                b:1
            }
        }
    }
}

    'dmg.all.all.b'.split('.').forEach(item => {
        console.log(item)
        res = res[item]
    });

    console.log(res)