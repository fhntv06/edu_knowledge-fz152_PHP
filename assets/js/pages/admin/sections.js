// Drag and drop для сортировки секций
const container = document.getElementById('sections-container');
let draggedItem = null;

container.querySelectorAll('.section-item').forEach(item => {
    item.setAttribute('draggable', 'true');

    item.addEventListener('dragstart', function(e) {
        draggedItem = this;
        e.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    item.addEventListener('drop', function(e) {
        e.preventDefault();
        if (draggedItem !== this) {
            const parent = this.parentNode;
            const children = [...parent.children];
            const draggedIndex = children.indexOf(draggedItem);
            const targetIndex = children.indexOf(this);

            if (draggedIndex < targetIndex) {
                parent.insertBefore(draggedItem, this.nextSibling);
            } else {
                parent.insertBefore(draggedItem, this);
            }
        }
    });
});

// Сохранение порядка
document.getElementById('order-form').addEventListener('submit', function(e) {
    const items = document.querySelectorAll('.section-item');
    const order = [];
    items.forEach((item, index) => {
        order.push({
            key: item.dataset.key,
            order: index + 1
        });
    });
    document.getElementById('section_order').value = JSON.stringify(order);
});