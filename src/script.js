document.addEventListener('DOMContentLoaded', () => {
    fetch('src/directory_structure.json')
        .then(response => response.json())
        .then(data => {
            const path = new URLSearchParams(window.location.search).get('path') || '';
            renderDirectory(getSubdirectory(data, path), path);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

function getSubdirectory(data, path) {
    if (!path) return data;
    const parts = path.split('/');
    let subdirectory = data;
    for (const part of parts) {
        subdirectory = subdirectory[part];
    }
    return subdirectory;
}

function renderDirectory(directory, basePath = '') {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear any existing content

    const folders = [];
    const files = [];

    for (const key in directory) {
        const value = directory[key];
        if (key === 'file') {
            files.push(...value);
        } else {
            folders.push(key);
        }
    }

    folders.forEach(folderName => {
        const card = createCard(folderName, 'folder', basePath);
        container.appendChild(card);
    });

    files.forEach(fileName => {
        const card = createCard(fileName, 'file', basePath);
        container.appendChild(card);
    });
}

function createCard(name, type, basePath) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const icon = document.createElement('i');
    icon.className = type === 'file' ? 'fas fa-file file' : 'fas fa-folder folder';
    card.appendChild(icon);
    
    const title = document.createElement('div');
    title.textContent = name;
    card.appendChild(title);

    card.addEventListener('click', () => {
        if (type === 'file') {
            const filePath = basePath ? `${basePath}/${name}` : name;
            // Open the file correctly
            window.open(filePath, '_blank');
        } else {
            const folderPath = basePath ? `${basePath}/${name}` : name;
            // Navigate to directory.html with the correct path
            window.location.href = `index.html?path=${encodeURIComponent(folderPath)}`;
        }
    });

    return card;
}
