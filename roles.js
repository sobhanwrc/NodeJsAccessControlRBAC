const AccessControl = require("accesscontrol");
const Role = require('./models/role');
const _ = require("lodash")
 
exports.roles = (async function() {
    //#region test with dynamic data from DB
    let finalArray = []
    const grantList = JSON.parse(JSON.stringify(await Role.find({},{_id : 0})))

    for(let i = 0; i < grantList.length; i++){
        const val = 'extend'
        if(val in grantList[i]){
            finalArray.push({
                "role": grantList[i].role,
                "resource": grantList[i].resource,
                "action": grantList[i].action,
                "attributes": grantList[i].attributes,
                "extend": 'editor'
            })
        }else{
            finalArray.push({
                "role": grantList[i].role,
                "resource": grantList[i].resource,
                "action": grantList[i].action,
                "attributes": grantList[i].attributes
            })
        }
    }
    // console.log(finalArray)
    const ac = new AccessControl(finalArray);

    const data = JSON.parse(JSON.stringify(ac))
    // console.log(data,'data')
    console.log(data._grants,'grants')

    const grantsObject = data._grants

    return _.forEach(grantsObject, async (value, key) => {
        _.forEach(grantList, async (grantListValue, grantListKey) => {
            if(key == grantListValue['role']){
                if('extend' in grantListValue){
                    return value = {
                        ...value,
                        "$extend": 'editor'
                    }
                }
            }
        })
    })
    console.log(grantsObject,'grantsObject')

    //#endregion
    
    //#region test with static data
    // let ac = new AccessControl();
    // console.log(ac,'ac')
    // ac.grant('user')                    // define new or modify existing role. also takes an array.
    // .createOwn('video')             // equivalent to .createOwn('video', ['*'])
    // .deleteOwn('video')
    // .readAny('video')
    // .grant('admin')                   // switch to another role without breaking the chain
    // .updateAny('video', ['title'])  // explicitly defined attributes
    // .deleteAny('video')
    // .extend('user')                 // inherit role capabilities. also takes an array;

    // const data = JSON.parse(JSON.stringify(ac))
    // console.log(data,'data')
    // console.log(data._grants,'grants')
    //#endregion

    //#region test with grant object
    // let grantsObject = {
    //     admin: {
    //         video: {
    //             'create:any': ['*', '!views'],
    //             'read:any': ['*'],
    //             'update:any': ['*', '!views'],
    //             'delete:any': ['*']
    //         },
    //         '$extend' : ["user"]
    //     },
    //     user: {
    //         video: {
    //             'create:own': ['*', '!rating', '!views'],
    //             'read:own': ['*'],
    //             'update:own': ['*', '!rating', '!views'],
    //             'delete:own': ['*']
    //         }
    //     }
    // };
    // const ac = new AccessControl(grantsObject);
    // const data = JSON.parse(JSON.stringify(ac))
    // console.log(data,'data')
    // console.log(data._grants,'grants')
    //#endregion
    
    return ac;
})();