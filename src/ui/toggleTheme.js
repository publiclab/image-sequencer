document.addEventListener('DOMContentLoaded',function() {
    document.getElementById('theme-toggler').addEventListener('change',function() {

        let color,bgcolor,sepColor;

        document.querySelector('body').classList.toggle('dark-theme');
        document.querySelector('.name-header').classList.toggle('dark-theme');

        document.querySelectorAll('h2').forEach(function(heading) {
            heading.classList.toggle('dark-theme');
        });

        document.querySelector('header').classList.toggle('dark-theme-spec');
        document.querySelector('#dropzone-text i').classList.toggle('dark-theme-spec');
        document.querySelector('.text-muted').classList.toggle('dark-theme-spec');

        document.querySelector('div.panel-body').classList.toggle('dark-theme');
        document.querySelector('input[type="file"]').classList.toggle('dark-theme-spec');

        if(document.getElementById('version-number-top-right').className.indexOf('dark-theme-spec') == -1){
            color = '#fff';
            bgcolor = '#fff';
            sepColor = '#000';
        }
        else{
            color = '#808080';
            bgcolor = '#000';
            sepColor = '#fff';
        }

        document.getElementById('update-prompt-modal').style.backgroundColor = bgcolor;
        document.getElementById('update-prompt-modal').style.color = sepColor;
        document.getElementById('version-number-top-right').style.color = color;
        document.getElementById('version-number-text').style.color = color;
        document.querySelector('#move-up i').style.color = color;

        document.getElementById('version-number-top-right').classList.toggle('dark-theme-spec');
        document.getElementById('update-prompt-modal').classList.toggle('dark-theme-spec');
        document.getElementById('version-number-text').classList.toggle('dark-theme-spec');
        document.querySelector('#move-up i').classList.toggle('dark-theme-spec');
    });
});
