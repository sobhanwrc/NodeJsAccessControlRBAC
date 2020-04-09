const AccessControl = require("accesscontrol");
const Role = require('./models/role');
const _ = require("lodash")
 
exports.roles = (async function() {
    //#region test with dynamic data from DB
    const grantList = JSON.parse(JSON.stringify(await Role.find({},{_id : 0})))

    const ac = new AccessControl(grantList);

    const data = JSON.parse(JSON.stringify(ac))

    const grantsObject = data._grants
    let finalObj = {}

    _.forEach(grantsObject, async (value, key) => {
        _.forEach(grantList, async (grantListValue, grantListKey) => {
            if(key == grantListValue['role']){
                if('extend' in grantListValue){
                    finalObj = { 
                        ...finalObj,
                        [key]: {
                             ...value,
                             '$extend': grantListValue['extend']
                         }
                    }
                }else{
                    finalObj = { 
                        ...finalObj,
                        [key]: {
                             ...value
                         }
                    }
                }
            }
        })
    })

    ac.setGrants(finalObj);
    console.log("passing *********************")
    console.log(ac.getGrants(),'get grants');

    //#endregion
    
    return ac;
})();