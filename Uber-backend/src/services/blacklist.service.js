
import blacklistModel from '../Model/blaklist.model.js'

async function addblacklist({token}){
   
    const addblacklist=blacklistModel.create(
        {
            token:token
        }
    )
    return addblacklist
}
export default addblacklist