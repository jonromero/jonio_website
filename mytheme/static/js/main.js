function toggleMenus() {
    return {
        sidebarOpen: false,
        setSideBarOpen(state) {
            this.sidebarOpen = state
        },
    }
}

function form_check() {
    return {

        showModal: false, inputText: '', formSubmitted: false,
        submitForm() {
            if (this.inputText === "4") {
                this.formSubmitted = true;
                this.showModal = false;
                const form = document.querySelector('form');

                // Submit the form
                form.submit();
            } else {
                alert("Try again");
            }
        }
    }
}


function init_comments() {
    return {
        render_comments() {
            const waline = Waline.init({
                el: '#waline',
                path: window.location.pathname.replace(/\/$/, ''),
                pageSize: 5,
                login: true,
                imageUploader: false,
                reaction: false,
                /*reaction: [
                    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_heart_eyes.png',
                    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_joy.png',
                    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_consider.png',
                    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
                ],*/
                serverURL: 'https://waline-comments-jonv.vercel.app'
            });
        }
    }
}

function text_rotation() {
    return {
        animated_text: 'epic',

        rotate_words() {
            var words = ['Startups', 'Web3', 'Hackathons', 'Metaverse', 'Cybersecutity', 'Biohacking', 'DAOs', 'Crypto'],
                currentWord = 0;

            setInterval(() => {
                if (currentWord > words.length - 1) currentWord = 0;
                this.animated_text = words[currentWord];
                currentWord++;
            }, 1500);
        }
    }
}
