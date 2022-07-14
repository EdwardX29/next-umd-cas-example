
export default async function handler(req, res) {
    const parseString = require('xml2js').parseString;
    const ticket = req.body.ticket 
    const cas_validate_url = ('https://shib.idm.umd.edu/shibboleth-idp/profile/cas/serviceValidate?service=' 
    + encodeURIComponent("http://127.0.0.1:3000" + "/secure") + "&ticket=" + ticket
    )
    const content = await fetch(cas_validate_url)
    const contentText = await content.text()

    // console.log(contentText)
    parseString(contentText, function(err, result){
        // console.log(result)
        try {
            console.log(result["cas:serviceResponse"]["cas:authenticationSuccess"][0]["cas:user"][0])
        } catch (e){
            console.log("Error")
            res.status(400).json("Invalid ticket please try again")
        }
    })
}

