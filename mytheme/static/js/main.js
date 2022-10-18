function toggleMenus() {
    return {
        sidebarOpen: false,
        setSideBarOpen(state) {
            this.sidebarOpen = state
        },
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
