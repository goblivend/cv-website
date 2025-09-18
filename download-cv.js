// CV Download Link Update Based on Language
document.addEventListener('DOMContentLoaded', function() {
    const downloadCvButton = document.getElementById('download-cv');

    document.addEventListener('languageChanged', function(event) {
        const lang = event.detail.lang;
        downloadCvButton.href = downloadCvButton.getAttribute(`data-pdf-${lang}`);
    });

});
