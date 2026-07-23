const ownerPhone = "2348063944434";

const prices = {
  live: 18000,
  "5kg": 25000,
  "10kg": 50000,
  custom: 0,
};

const labels = {
  live: "Live chicken",
  "5kg": "Dressed chicken - 5kg",
  "10kg": "Dressed chicken - 10kg",
  custom: "Custom order",
};

const orderForm = document.querySelector("#orderForm");
const orderType = document.querySelector("#orderType");
const quantity = document.querySelector("#quantity");
const totalAmount = document.querySelector("#totalAmount");
const customField = document.querySelector("#customField");
const customRequest = document.querySelector("#customRequest");

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function updateOrderSummary() {
  const type = orderType.value;
  const amount = prices[type] * Number(quantity.value || 1);

  customField.classList.toggle("is-visible", type === "custom");
  customRequest.required = type === "custom";
  totalAmount.textContent = type === "custom" ? "Confirm with owner" : currency.format(amount);
}

orderType.addEventListener("change", updateOrderSummary);
quantity.addEventListener("input", updateOrderSummary);

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#customerName").value.trim();
  const phone = document.querySelector("#customerPhone").value.trim();
  const type = orderType.value;
  const amount = prices[type] * Number(quantity.value || 1);
  const address = document.querySelector("#address").value.trim();
  const customText = customRequest.value.trim();

  const message = [
    "Hello, I want to place a chicken order.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Order: ${labels[type]}`,
    `Quantity: ${quantity.value}`,
    type === "custom" ? `Custom request: ${customText}` : `Estimated total: ${currency.format(amount)}`,
    `Address/Pickup note: ${address}`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

updateOrderSummary();
