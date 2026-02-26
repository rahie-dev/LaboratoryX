
// Menu toggle for mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {
	menuToggle.addEventListener('click', () => {
		navLinks.classList.toggle('active');
	});
}

// Drag & drop / click upload UI (supports #prescription)
const uploadDrop = document.getElementById('uploadDrop');
const fileInput = document.getElementById('prescription') || document.getElementById('fileInput');
if (uploadDrop) {
	['dragenter', 'dragover'].forEach(evt => {
		uploadDrop.addEventListener(evt, (e) => { e.preventDefault(); uploadDrop.classList.add('dragover'); });
	});
	['dragleave', 'drop'].forEach(evt => {
		uploadDrop.addEventListener(evt, (e) => { e.preventDefault(); uploadDrop.classList.remove('dragover'); });
	});

	uploadDrop.addEventListener('drop', (e) => {
		const files = e.dataTransfer.files;
		if (files && files.length && fileInput) fileInput.files = files;
		updateUploadLabel(files && files[0] ? files[0].name : '');
	});
}

function updateUploadLabel(name) {
	if (!uploadDrop) return;
	const title = uploadDrop.querySelector('.upload-title');
	const sub = uploadDrop.querySelector('.upload-sub');
	if (name) {
		if (title) title.textContent = name;
		if (sub) sub.textContent = '';
	} else {
		if (title) title.textContent = 'Click to upload or drag and drop';
		if (sub) sub.textContent = 'PDF, JPG, PNG up to 5MB';
	}
}

if (fileInput) {
	fileInput.addEventListener('change', () => {
		const name = fileInput.files[0] ? fileInput.files[0].name : '';
		updateUploadLabel(name);
	});
}
