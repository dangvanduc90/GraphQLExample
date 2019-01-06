const fetch = require('node-fetch');
const DataLoader = require('dataloader');

class BookClass {
    async getBook() {
        // // return {
        // //     title: "How to",
        // //     author: "dangduc"
        // // }
        // const response = await fetch('https://api.github.com/users/github')
        // const result = await response.json();
        // // console.log(result)
        // return {
        //     title: result.bio,
        //     author: result.email
        // }



        let result = await allGroupLoader.load('all_group').catch(error => {
            if (error) {
                allGroupLoader.clear('all_group');
                console.log(error)
            }
            return null;
        });
        if(!result){
            allGroupLoader.clear('all_group');
        }
        return {
            title: result.bio,
            author: result.email
        }
        return result;
    }
}
var allGroupLoader = new DataLoader(keys => {
    console.log(keys)
    let result = new Promise(resolve => {
        resolve(
            keys.map(
                // async key => {
                //     let result = await fetch('https://api.github.com/users/github')
                //     return await result.json();
                // }
                async key => {
                    return {
                        bio: "How to",
                        email: "dangduc"
                    }
                }
            )
        )
    });
    return result;
});
const Book = new BookClass();
export { Book }