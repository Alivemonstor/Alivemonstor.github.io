let itemsArr = [];
let categories = [];
let cart = [];
let allItems = {
    item1: {label: "Item 1", price: 10000},
};
let managementData = {
    money: 0,
    storage: { used: 0, max: 100 }
};
let currentMoneyAction = '';
let selectedEmployee = null;
let employees = [];
const employeeNames = ['Alex', 'Jordan', 'Casey', 'Taylor', 'Morgan', 'Riley', 'Jamie', 'Avery', 'Quinn', 'Sage'];
const employeeRoles = [
    { title: 'Trainee', grade: 1},
    { title: 'Sales Associate', grade: 2},
    { title: 'Senior Associate', grade: 3},
    { title: 'Team Lead', grade: 4},
    { title: 'Assistant Manager', grade: 5},
    { title: 'Manager', grade: 6}
];

$(document).ready(() => {
    window.addEventListener('message', function(event) {
        if (event.data.open == true) {
            itemsArr = [];
            Object.keys(event.data.items).forEach(itemKey => {
                let item = event.data.items[itemKey];
                allItems[itemKey] = item;
                if (itemsArr[item.category] == null) {
                    itemsArr[item.category] = [];
                }
                itemsArr[item.category].push(`
                    <div class="part card-hover-effect loading" id="Items">
                        <img class='partImg' src='https://cfx-nui-${event.data.inventory}/${item.image}.png' alt='${item.label}' loading='lazy'/>
                        <div class='separator'></div>
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <p class='item-name'>${item.label}</p>
                            <p class='item-price'>$${item.price.toLocaleString()}</p>
                        </div>
                        <div class="d-flex gap-2">
                            <button class='btn buy-btn flex-fill' type='button' data-item='${itemKey}'>
                                <span>Purchase</span>
                            </button>
                            <button class='btn add-to-cart-btn' type='button' data-item='${itemKey}' title='Add to Cart'>
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                `);
            })

            categories = [];
            let categoryButtons = [];
            
            categoryButtons.push(`<div class="category-button" data-category="all">All Items</div>`);
            
            Object.keys(itemsArr).forEach((category) => {
                categories.push(`<div class='category-head'><h5 class='category-title'>${category}</h5></div>${itemsArr[category].join("")}`);
                categoryButtons.push(`<div class="category-button" data-category="${category}">${category}</div>`);
            })
            $('.category-options').html(`
                <h6 class="text-white-50 mb-3 text-uppercase" style="font-size: 12px; letter-spacing: 1px;">Categories</h6>
                ${categoryButtons.join("\n")}
            `);
            $('.parts').html(categories.join("\n"));
            $('#LaptopM').css('display', 'block');
            $('#MarketMain').css('display', 'flex');
            $('#LaptopM').css('animation', 'slideUp 0.4s ease-out');
            
            setTimeout(() => {
                $('.part').addClass('loading');
            }, 100);
        } else {
            $('#LaptopM').css('display', 'none');
        }
    })
})


$(document).on('click', '#Logo', e => {
    $('#MarketMain').css('display', 'none');
    $('#LaptopM').css('animation', 'slideDown 0.4s ease-out');
    setTimeout(function() {
        $('#LaptopM').css('display', 'none');
        $.post(`https://al-weedshop/CloseLaptop`);
    }, 400)
})

let categorySelected = null;
$(document).on('click', '.category-button', e => {
    let cat = $(e.target).text();
    let categoryData = $(e.target).data('category');
    
    $('.category-button').removeClass('active');
    
    if (categoryData === 'all' || cat === 'All Items') {
        $('.parts').html(categories.join("\n"));
        $(e.target).addClass('active');
        categorySelected = null;
        
        setTimeout(() => {
            $('.part').addClass('loading');
        }, 50);
        return;
    }
    
    $(e.target).addClass('active');
    categorySelected = $(e.target);
    
    let filteredCat = [];
    Object.keys(itemsArr).forEach(category => {
        if (category === cat) {
            filteredCat.push(`
                <div class='category-head'>
                    <h5 class='category-title'>${category}</h5>
                </div>
                <div class='category-items'>
                    ${itemsArr[category].join("")}
                </div>
            `);
        }
    });
    
    $('.parts').html(filteredCat.join("\n"));
    
    setTimeout(() => {
        $('.part').addClass('loading');
    }, 50);
})

$(document).keydown(e => {
    if (e.keyCode == 27) {
        $('#LaptopM').css('animation', 'slideDown 0.4s ease-out');
        setTimeout(function() {
            $('#MarketMain').css('display', 'none');
            $('#LaptopM').css('display', 'none');
            $.post(`https://al-weedshop/CloseLaptop`);
        }, 400)
    }
})

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#CartBadge').text(totalItems);
    if (totalItems > 0) {
        $('#CartBadge').show();
    } else {
        $('#CartBadge').hide();
    }
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    $('#CartTotal').text(total.toLocaleString());
}

function addToCart(itemKey) {
    const item = allItems[itemKey];
    if (!item) return;
    
    const existingItem = cart.find(cartItem => cartItem.id === itemKey);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: itemKey,
            name: item.label,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    updateCartBadge();
    updateCartDisplay();
}

function removeFromCart(itemKey) {
    cart = cart.filter(item => item.id !== itemKey);
    updateCartBadge();
    updateCartDisplay();
}

function updateQuantity(itemKey, newQuantity) {
    const item = cart.find(cartItem => cartItem.id === itemKey);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemKey);
        } else {
            item.quantity = newQuantity;
            updateCartBadge();
            updateCartDisplay();
        }
    }
}

function clearCart() {
    cart = [];
    updateCartBadge();
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContent = $('#CartContent');
    const cartFooter = $('#CartFooter');
    const emptyCart = $('#EmptyCart');
    
    if (cart.length === 0) {
        emptyCart.show();
        cartFooter.hide();
        return;
    }
    
    emptyCart.hide();
    cartFooter.show();
    
    let cartHTML = '';
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <img class="cart-item-img" src="https://cfx-nui-qb-inventory/${item.image}.png" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-action="decrease" data-item="${item.id}">-</button>
                        <div class="quantity-display">${item.quantity}</div>
                        <button class="quantity-btn" data-action="increase" data-item="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-item="${item.id}">×</button>
                </div>
            </div>
        `;
    });
    
    cartContent.html(cartHTML);
    updateCartTotal();
}

$(document).on('click', '#CartIcon', () => {
    $('#MarketMain').hide();
    $('#CartModal').show();
});

$(document).on('click', '#CartClose', () => {
    $('#CartModal').hide();
    $('#MarketMain').show();
});

$(document).on('click', '.add-to-cart-btn', e => {
    e.preventDefault();
    const itemKey = $(e.currentTarget).data('item');
    addToCart(itemKey);
});

$(document).on('click', '.quantity-btn', e => {
    const action = $(e.currentTarget).data('action');
    const itemKey = $(e.currentTarget).data('item');
    const currentItem = cart.find(item => item.id === itemKey);
    
    if (currentItem) {
        const newQuantity = action === 'increase' ? currentItem.quantity + 1 : currentItem.quantity - 1;
        updateQuantity(itemKey, newQuantity);
    }
});

$(document).on('click', '.remove-item', e => {
    const itemKey = $(e.currentTarget).data('item');
    removeFromCart(itemKey);
});

$(document).on('click', '#ClearCart', () => {
    clearCart();
});

$(document).on('click', '#CheckoutCart', () => {
    if (cart.length === 0) return;
    
    cart.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
            $.post("https://al-weedshop/BuyItem", item.id);
        }
        managementData.money += item.price * item.quantity;
    });
    
    clearCart();
    $('#CartModal').hide();
    $('#MarketMain').show();
});

$(document).on('click', '.buy-btn', e => {
    let button = $(e.currentTarget);
    let originalText = button.find('span').text();
    let itemKey = button.data('item');
    
    button.prop('disabled', true);
    button.find('span').text('Processing...');
    button.css('opacity', '0.7');
    
    $.post("https://al-weedshop/BuyItem", itemKey);
    
    const item = allItems[itemKey];
    if (item) {
        managementData.money += item.price;
    }
    
    setTimeout(() => {
        button.prop('disabled', false);
        button.find('span').text(originalText);
        button.css('opacity', '1');
    }, 1000);
})

function updateManagementData(data) {
    if (data) {
        managementData = { ...managementData, ...data };
    }
    
    $('#ShopMoney').text(`$${managementData.money.toLocaleString()}`);
    
    const storagePercent = (managementData.storage.used / managementData.storage.max) * 100;
    $('#StorageUsed').text(`${managementData.storage.used} / ${managementData.storage.max}`);
    $('#StoragePercent').text(`${Math.round(storagePercent)}%`);
    $('#StorageFill').css('width', `${storagePercent}%`);
    
    let fillElement = $('#StorageFill');
    if (storagePercent > 90) {
        fillElement.css('background', 'linear-gradient(90deg, #dc2626, #ef4444)');
    } else if (storagePercent > 70) {
        fillElement.css('background', 'linear-gradient(90deg, #f59e0b, #fbbf24)');
    } else {
        fillElement.css('background', 'linear-gradient(90deg, #ff6b35, #f7931e)');
    }
}

$(document).on('click', '#ManagementIcon', () => {
    $('#MarketMain').hide();
    $('#CartModal').hide();
    $('#ManagementModal').show();
    updateManagementData();
});

$(document).on('click', '#ManagementClose', () => {
    $('#ManagementModal').hide();
    $('#MarketMain').show();
});

function generateRandomEmployee() {
    const name = employeeNames[Math.floor(Math.random() * employeeNames.length)];
    const startingRole = employeeRoles[0];
    const avatarIcons = [
        '<i class="fas fa-user-tie"></i>',
        '<i class="fas fa-user-nurse"></i>',
        '<i class="fas fa-user-cog"></i>',
        '<i class="fas fa-user-shield"></i>',
        '<i class="fas fa-user-graduate"></i>',
        '<i class="fas fa-user-friends"></i>'
    ];
    const avatar = avatarIcons[Math.floor(Math.random() * avatarIcons.length)];
    
    return {
        id: Date.now() + Math.random(),
        name: name,
        role: startingRole,
        avatar: avatar,
        hiredDate: new Date()
    };
}

function updateEmployeeDisplay() {
    const employeeCount = employees.length;
    
    $('#EmployeeCount').text(employeeCount);
    
    updatePromoteDemoteButtons();
    
    const employeeList = $('#EmployeeList');
    const emptyEmployees = $('#EmptyEmployees');
    
    if (employeeCount === 0) {
        emptyEmployees.show();
        $('.employee-item').remove();
    } else {
        emptyEmployees.hide();
        
        $('.employee-item').remove();
        
        employees.forEach(employee => {
            const employeeHtml = `
                <div class="employee-item" data-employee-id="${employee.id}">
                    <div class="employee-info">
                        <div class="employee-avatar">${employee.avatar}</div>
                        <div class="employee-details">
                            <div style="display: flex; align-items: center;">
                                <p class="employee-name">${employee.name}</p>
                                <span class="employee-grade">Grade ${employee.role.grade}</span>
                            </div>
                            <p class="employee-role">${employee.role.title}</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-3">
                        <button class="fire-employee-btn" data-employee-id="${employee.id}">Fire</button>
                    </div>
                </div>
            `;
            employeeList.append(employeeHtml);
        });
    }
}

$(document).on('click', '#HireEmployee', () => {
    employees.push(generateRandomEmployee());
    updateEmployeeDisplay();
});

$(document).on('click', '.fire-employee-btn', (e) => {
    const employeeId = $(e.target).data('employee-id');
    const employeeIndex = employees.findIndex(emp => emp.id == employeeId);
    
    if (employeeIndex !== -1) {
        const firedEmployee = employees[employeeIndex];
        employees.splice(employeeIndex, 1);
        selectedEmployee = null;
        updateEmployeeDisplay();
    }
});

$(document).on('click', '.employee-item', function(e) {
    if ($(e.target).hasClass('fire-employee-btn')) return;
    
    $('.employee-item').removeClass('selected');
    $(this).addClass('selected');
    selectedEmployee = $(this).data('employee-id');
    updatePromoteDemoteButtons();
});

function updatePromoteDemoteButtons() {
    const hasSelection = selectedEmployee !== null;
    let canPromote = false;
    let canDemote = false;
    
    if (hasSelection) {
        const employee = employees.find(emp => emp.id == selectedEmployee);
        if (employee) {
            canPromote = employee.role.grade < employeeRoles.length;
            canDemote = employee.role.grade > 1;
        }
    }
    
    $('#PromoteEmployee').prop('disabled', !canPromote);
    $('#DemoteEmployee').prop('disabled', !canDemote);
}

function promoteEmployee(employeeId) {
    const employee = employees.find(emp => emp.id == employeeId);
    if (employee && employee.role.grade < employeeRoles.length) {
        const newRole = employeeRoles.find(role => role.grade === employee.role.grade + 1);
        if (newRole) {
            employee.role = newRole;
            updateEmployeeDisplay();
        }
    }
}

function demoteEmployee(employeeId) {
    const employee = employees.find(emp => emp.id == employeeId);
    if (employee && employee.role.grade > 1) {
        const newRole = employeeRoles.find(role => role.grade === employee.role.grade - 1);
        if (newRole) {
            employee.role = newRole;
            updateEmployeeDisplay();
        }
    }
}

$(document).on('click', '#PromoteEmployee', () => {
    if (selectedEmployee) {
        promoteEmployee(selectedEmployee);
    }
});

$(document).on('click', '#DemoteEmployee', () => {
    if (selectedEmployee) {
        demoteEmployee(selectedEmployee);
    }
});


function openMoneyModal(action) {
    currentMoneyAction = action;
    const modal = $('#MoneyModal');
    const title = $('#MoneyModalTitle');
    const confirmBtn = $('#MoneyConfirmBtn');
    
    if (action === 'deposit') {
        title.text('Deposit Money');
        confirmBtn.text('Deposit').removeClass('withdraw').addClass('deposit');
    } else {
        title.text('Withdraw Money');
        confirmBtn.text('Withdraw').removeClass('deposit').addClass('withdraw');
    }
    
    $('#MoneyAmount').val('');
    modal.show();
}

function closeMoneyModal() {
    $('#MoneyModal').hide();
    currentMoneyAction = '';
}

function processMoneyTransaction() {
    const amount = parseInt($('#MoneyAmount').val());
    
    if (!amount || amount <= 0) {
        return;
    }
    
    if (currentMoneyAction === 'deposit') {
        managementData.money += amount;
        updateManagementData();
    } else if (currentMoneyAction === 'withdraw') {
        if (amount <= managementData.money) {
            managementData.money -= amount;
            updateManagementData();
        }
    }
    
    closeMoneyModal();
}

$(document).on('click', '#DepositMoney', () => {
    openMoneyModal('deposit');
});

$(document).on('click', '#WithdrawMoney', () => {
    openMoneyModal('withdraw');
});

$(document).on('click', '#MoneyModalClose, #MoneyCancelBtn', () => {
    closeMoneyModal();
});

$(document).on('click', '#MoneyConfirmBtn', () => {
    processMoneyTransaction();
});

$(document).on('click', '.quick-amount-btn', (e) => {
    const amount = $(e.target).data('amount');
    $('#MoneyAmount').val(amount);
});

$(document).on('click', '#MoneyModal', (e) => {
    if (e.target.id === 'MoneyModal') {
        closeMoneyModal();
    }
});

$(document).on('keypress', '#MoneyAmount', (e) => {
    if (e.which === 13) {
        processMoneyTransaction();
    }
});

$(document).on('click', '#OpenInventory', () => {
    $('#ManagementModal').hide();
    $('#MarketMain').hide();
    
    $.post("https://al-weedshop/OpenInventory");
});

$(document).ready(() => {
    managementData.money = 45750;
    managementData.storage.used = 67;
    managementData.storage.max = 100;
    updateEmployeeDisplay();
});