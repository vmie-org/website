
export const chatService = {
    simulate: false,
    dummySentences: [
        "Lorem ipsum dolor sit amet.",
        "Consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore.",
        "Ut enim ad minim veniam.",
        "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident.",
        "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Phasellus fermentum odio eu feugiat pretium.",
        "Curabitur gravida arcu ac tortor dignissim.",
        "Vivamus magna justo, lacinia eget consectetur sed.",
        "Pellentesque in ipsum id orci porta dapibus.",
        "Proin eget tortor risus.",
        "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
        "Mauris blandit aliquet elit.",
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
        "Nulla quis lorem ut libero malesuada feugiat.",
        "Donec sollicitudin molestie malesuada.",
        "Cras ultricies ligula sed magna dictum porta.",
        "Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
        "Vivamus suscipit tortor eget felis porttitor volutpat.",
        "Sed porttitor lectus nibh.",
        "Curabitur aliquet quam id dui posuere blandit.",
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
        "Etiam porta sem malesuada magna mollis euismod.",
        "Donec id elit non mi porta gravida at eget metus.",
        "Cras mattis consectetur purus sit amet fermentum.",
        "Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
        "Maecenas sed diam eget risus varius blandit sit amet non magna.",
        "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh."
    ],
    dummyCont: 30,

    initialize(){
        if(this.simulate){

            setInterval(() => {
                this.dummyCont--;
                if(this.dummyCont < 0){
                    return;
                }
                let index = Math.floor(Math.random() * (this.dummySentences.length - 1));
                let name = "Anonymous User";
                let message = this.dummySentences[index];
                this.messages.push({
                    deleted: 0,
                    message: message,
                    name: name,
                    initials: this.buildAcronym(message).substring(0,2),
                    icon: name,
                });
                Vue.nextTick(() =>{
                    const container = document.querySelector("#messages");
                    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
                });
            }, 500);
        }
    }
}

export default {
    chatService
}
