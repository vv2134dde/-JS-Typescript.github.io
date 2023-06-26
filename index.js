"use strict";
class PostedComment {
    name;
    likes;
    date;
    Date;
    text;
    icon;
    isReply;
    isFavorite;
    isReacted;
    body;
    replies;
    constructor(user) {
        this.name = user.name;
        this.likes = user.likes;
        this.Date = user.Date;
        this.date = user.date;
        this.text = user.text;
        this.icon = user.icon;
        this.isReply = user.isReply;
        this.isFavorite = user.isFavorite;
        this.isReacted = user.isReacted;
        this.replies = [];
    }
    reply(date) {
        isItReply = date;
        textarea.focus();
    }
    favorites(toFavorites) {
        this.isFavorite = !this.isFavorite;
        toFavorites.innerHTML = `${this.isFavorite
            ? `<img src="svg/2.svg" alt=""><span>В избранном</span>`
            : `<img src="svg/6.svg" alt=""><span>В избранное</span>`}`;
        const info = commentsInfo.find(el => el.date === this.date);
        info.isFavorite = this.isFavorite;
        localStorage.setItem('comments', JSON.stringify(commentsInfo));
    }
    like(likesDiv) {
        const info = commentsInfo.find(el => el.date === this.date);
        if (this.isReacted === '+') {
            likesDiv.classList.remove('like');
            this.likes -= 1;
            this.isReacted = false;
            info.isReacted = false;
        }
        else {
            likesDiv.classList.add('like');
            this.likes += 1;
            if (this.isReacted === '-') {
                this.likes += 1;
                likesDiv.classList.remove('dislike');
            }
            this.isReacted = '+';
            info.isReacted = '+';
        }
        likesDiv.innerText = `${this.likes}`;
        info.likes = this.likes;
        localStorage.setItem('comments', JSON.stringify(commentsInfo));
    }
    dislike(likesDiv) {
        const info = commentsInfo.find(el => el.date === this.date);
        if (this.isReacted === '-') {
            likesDiv.classList.remove('dislike');
            this.likes += 1;
            this.isReacted = false;
            info.isReacted = false;
        }
        else {
            likesDiv.classList.add('dislike');
            this.likes -= 1;
            if (this.isReacted === '+') {
                this.likes -= 1;
                likesDiv.classList.remove('like');
            }
            this.isReacted = '-';
            info.isReacted = '-';
        }
        likesDiv.innerText = `${this.likes}`;
        info.likes = this.likes;
        localStorage.setItem('comments', JSON.stringify(commentsInfo));
    }
    getHTMLElement(name) {
        const newHTMLComment = document.createElement('div');
        newHTMLComment.classList.add(`postedComment`);
        if (this.isReply) {
            newHTMLComment.classList.add('isReply');
        }
        const icon = document.createElement('img');
        icon.setAttribute('src', `${this.icon}`);
        icon.setAttribute('alt', `${this.name}`);
        icon.setAttribute('id', 'icon');
        newHTMLComment.appendChild(icon);
        const commentContent = document.createElement('div');
        commentContent.classList.add('comment-content');
        const head = document.createElement('div');
        head.classList.add('head');
        const wrapperNameReply = document.createElement('div');
        wrapperNameReply.classList.add('wrapper-name-reply');
        head.appendChild(wrapperNameReply);
        const date = document.createElement('div');
        date.classList.add('date');
        date.innerText = this.date;
        head.appendChild(date);
        commentContent.appendChild(head);
        const body = document.createElement('p');
        body.classList.add('body');
        body.innerHTML = this.text;
        commentContent.appendChild(body);
        const footer = document.createElement('div');
        footer.classList.add('footer');
        commentContent.appendChild(footer);
        newHTMLComment.appendChild(commentContent);
        const thisName = document.createElement('h5');
        wrapperNameReply.appendChild(thisName);
        thisName.innerText = this.name;
        if (this.isReply) {
            const replyTo = document.createElement('div');
            replyTo.classList.add('replyTo');
            replyTo.innerHTML = `<img src="svg/5.svg" alt=""><span>${name}</span>`;
            wrapperNameReply.appendChild(replyTo);
        }
        if (!this.isReply) {
            const replyButton = document.createElement('button');
            replyButton.classList.add('reply');
            replyButton.innerHTML = `<img src="svg/5.svg" alt=""><span>Ответить</span>`;
            footer.appendChild(replyButton);
            replyButton.onclick = () => {
                this.reply(this.date);
            };
        }
        const toFavorites = document.createElement('button');
        toFavorites.classList.add('toFavorites');
        toFavorites.innerHTML = `${this.isFavorite
            ? `<img src="svg/2.svg" alt=""><span>В избранном</span>`
            : `<img src="svg/6.svg" alt=""><span>В избранное</span>`}`;
        footer.appendChild(toFavorites);
        toFavorites.onclick = () => {
            this.favorites(toFavorites);
        };
        const likesDiv = document.createElement('div');
        likesDiv.classList.add('likes');
        footer.appendChild(likesDiv);
        const dislike = document.createElement('button');
        dislike.classList.add('dislike');
        dislike.innerText = `-`;
        likesDiv.appendChild(dislike);
        const theNumberOfLikes = document.createElement('div');
        theNumberOfLikes.innerText = `${this.likes}`;
        if (this.isReacted === '+') {
            theNumberOfLikes.classList.add('like');
        }
        else if (this.isReacted === '-') {
            theNumberOfLikes.classList.add('dislike');
        }
        likesDiv.appendChild(theNumberOfLikes);
        const like = document.createElement(`button`);
        like.classList.add('like');
        like.innerText = `+`;
        likesDiv.appendChild(like);
        dislike.onclick = () => {
            this.dislike(theNumberOfLikes);
        };
        like.onclick = () => {
            this.like(theNumberOfLikes);
        };
        this.body = newHTMLComment;
    }
}
let numberOfComments;
const numOfComDiv = document.getElementById('numberOfComments');
const dropdownBtn = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const favoritesBtn = document.getElementById('favorites');
const textarea = document.getElementById('comment');
const sizeControl = document.querySelector('.comment');
const charsCounter = document.querySelector('.charsCounter');
const postBtn = document.getElementById('comment-button');
const warning = document.querySelector('.warning');
const commentsDiv = document.querySelector('.comments');
const icon = document.getElementById('icon');
// два массива: один для хранения в памяти и второй для отрисовки
let commentsInfo = [];
let comments = [];
let isItReply = false;
let id;
dropdownBtn.onclick = () => {
    dropdownMenu.classList.toggle('open');
};
function render() {
    numOfComDiv.innerText = `(${numberOfComments})`;
    commentsDiv.innerHTML = '';
    favoritesBtn.classList.contains('tapped')
        ? comments.forEach(el => {
            if (el.isFavorite) {
                commentsDiv.appendChild(el.body);
                el.replies.forEach(reply => {
                    if (reply.isFavorite) {
                        commentsDiv.appendChild(reply.body);
                    }
                });
            }
        })
        : comments.forEach(el => {
            commentsDiv.appendChild(el.body);
            el.replies.forEach(reply => {
                commentsDiv.appendChild(reply.body);
            });
        });
}
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('numberOfComments') === null) {
        id = 30;
        numberOfComments = 80;
        const Alex = {
            name: 'Алексей_1994b',
            likes: 6,
            Date: new Date('2023-01-15T13:55:00'),
            date: '15.01 13:55',
            text: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
            icon: 'https://picsum.photos/id/10/100',
            isReply: false,
            isFavorite: true,
            isReacted: false
        };
        const Jun = {
            name: 'Джунбокс3000',
            likes: 3,
            Date: new Date('2023-01-15T15:18:00'),
            date: '15.01 15:18',
            text: "Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.",
            icon: 'https://picsum.photos/id/20/100',
            isReply: '15.01 13:55',
            isFavorite: false,
            isReacted: false
        };
        commentsInfo = [Alex, Jun];
        localStorage.setItem('numberOfComments', JSON.stringify(numberOfComments));
        localStorage.setItem('comments', JSON.stringify(commentsInfo));
        localStorage.setItem('id', JSON.stringify(id));
    }
    else {
        id = JSON.parse(localStorage.getItem('id'));
        numberOfComments = JSON.parse(localStorage.getItem('numberOfComments'));
        commentsInfo = JSON.parse(localStorage.getItem('comments'));
    }
    icon.setAttribute('src', `https://picsum.photos/id/${id}/100`);
    commentsInfo.forEach(commObj => {
        const commClass = new PostedComment(commObj);
        if (!commClass.isReply) {
            comments.push(commClass);
            commClass.getHTMLElement('');
        }
        else {
            comments.forEach(el => {
                if (commClass.isReply === el.date) {
                    el.replies.push(commClass);
                    commClass.getHTMLElement(el.name);
                }
            });
        }
    });
    render();
    textarea.oninput = () => {
        sizeControl.innerHTML = `<p>${textarea.value}</p>`;
        textarea.style.height = `${sizeControl.clientHeight}px`;
        const lengthOfComment = textarea.value.length;
        charsCounter.innerText = `${lengthOfComment}/1000`;
        if (lengthOfComment <= 1000) {
            postBtn.disabled = false;
            if (charsCounter.classList.contains('moreThan1000')) {
                charsCounter.classList.remove('moreThan1000');
            }
            if (lengthOfComment === 0) {
                charsCounter.innerText = `Макс. 1000 символов`;
                postBtn.disabled = true;
            }
            warning.style.display = 'none';
        }
        else {
            postBtn.disabled = true;
            charsCounter.classList.add('moreThan1000');
            warning.style.display = 'block';
        }
    };
    postBtn.onclick = (event) => {
        event.preventDefault();
        const now = new Date();
        const date = now.toLocaleString();
        const newInfo = {
            name: 'Максим Авдеенко',
            likes: 0,
            Date: now,
            date: `${date.slice(0, 5)} ${date.slice(12, 17)}`,
            text: textarea.value.split('\n').join('<br>'),
            icon: `https://picsum.photos/id/${id}/100`,
            isReply: isItReply,
            isFavorite: false,
            isReacted: false
        };
        id += 10;
        localStorage.setItem('id', JSON.stringify(id));
        icon.setAttribute('src', `https://picsum.photos/id/${id}/100`);
        textarea.value = '';
        sizeControl.innerText = textarea.value;
        textarea.style.height = `${sizeControl.clientHeight}px`;
        charsCounter.innerText = `Макс. 1000 символов`;
        postBtn.disabled = true;
        const newComment = new PostedComment(newInfo);
        commentsInfo.push(newInfo);
        localStorage.setItem('comments', JSON.stringify(commentsInfo));
        numberOfComments += 1;
        localStorage.setItem('numberOfComments', JSON.stringify(numberOfComments));
        if (isItReply) {
            comments.forEach(el => {
                if (newComment.isReply === el.date) {
                    el.replies.push(newComment);
                    newComment.getHTMLElement(el.name);
                    return;
                }
            });
        }
        else {
            comments.push(newComment);
            newComment.getHTMLElement('');
        }
        isItReply = false;
        render();
        newComment.body.scrollIntoView({ behavior: "smooth" });
    };
    favoritesBtn.onclick = () => {
        favoritesBtn.classList.toggle('tapped');
        render();
    };
    dropdownItems.forEach(item => {
        item.onclick = () => {
            if (item.classList.contains('active')) {
                dropdownBtn.classList.toggle('open');
            }
            else {
                dropdownItems.forEach(searchItem => {
                    if (searchItem.classList.contains('active')) {
                        searchItem.classList.remove('active');
                    }
                });
                item.classList.add('active');
                if (dropdownBtn.classList.contains('open')) {
                    dropdownBtn.classList.remove('open');
                }
            }
            const sortValue = item.dataset.value;
            if (dropdownBtn.classList.contains('open')) {
                switch (sortValue) {
                    case 'date':
                        comments.sort((a, b) => a.Date > b.Date ? 1 : -1);
                        break;
                    case 'likes':
                        comments.sort((a, b) => a.likes > b.likes ? 1 : -1);
                        break;
                    case 'replies':
                        comments.sort((a, b) => a.replies.length > b.replies.length ? 1 : -1);
                }
            }
            else {
                switch (sortValue) {
                    case 'date':
                        comments.sort((a, b) => a.Date < b.Date ? 1 : -1);
                        break;
                    case 'likes':
                        comments.sort((a, b) => a.likes < b.likes ? 1 : -1);
                        break;
                    case 'replies':
                        comments.sort((a, b) => a.replies.length < b.replies.length ? 1 : -1);
                }
            }
            console.log(comments);
            dropdownBtn.innerText = item.innerText;
            render();
        };
    });
});