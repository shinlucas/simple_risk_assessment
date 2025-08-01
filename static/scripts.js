let accumulatedData = [];

window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/get_equipment_list");
  const equipmentList = await res.json();

  const datalist = document.getElementById("equipmentList");
  equipmentList.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  });
});

// 위험요인 표시
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const equipment = document.getElementById("searchBox").value.trim();
  if (!equipment) return;

  const res = await fetch("/get_risks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ equipment })
  });

  const risks = await res.json();
  const area = document.getElementById("checkboxArea");
  area.innerHTML = "";

  risks.forEach((risk, idx) => {
    const div = document.createElement("div");
    div.className = "flex items-center justify-between";

    div.innerHTML = `
      <label class="flex items-center">
        <input type="checkbox" class="mr-2" id="risk-${idx}" value="${risk}">
        <span>${risk}</span>
      </label>
      <select class="border rounded px-2 py-1 text-sm">
        <option value="보완">보완</option>
        <option value="적정">적정</option>
      </select>
    `;

    area.appendChild(div);
  });
});

// 리스트에 추가
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  const equipment = document.getElementById("searchBox").value.trim();
  if (!equipment) return;

  const area = document.getElementById("checkboxArea");
  const items = area.querySelectorAll("div");
  const selected = [];

  items.forEach(div => {
    const checkbox = div.querySelector("input[type='checkbox']");
    const select = div.querySelector("select");

    if (checkbox.checked) {
      selected.push({
        equipment,
        risk: checkbox.value,
        evaluation: select.value
      });
    }
  });

  accumulatedData.push(...selected);
  renderTable();
});

function renderTable() {
  const tbody = document.getElementById("resultBody");
  tbody.innerHTML = "";
  accumulatedData.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";

    tr.innerHTML = `
      <td class="px-2 py-1 w-[100px] text-center">${item.equipment}</td>
      <td class="px-2 py-1 w-[350px] text-left">${item.risk}</td>
      <td class="px-2 py-1 w-[60px] text-center">${item.evaluation === "적정" ? "◯" : ""}</div></td>
      <td class="px-2 py-1 w-[60px] text-center">${item.evaluation === "보완" ? "◯" : ""}</div></td>
      <td class="px-2 py-1 w-[60px] text-center">
        <button class="text-red-500 text-sm" onclick="removeRow(${index})">❌</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  document.getElementById("dataField").value = JSON.stringify(accumulatedData);

  syncHeaderColumnForScrollbar();
}

function removeRow(index) {
  accumulatedData.splice(index, 1);
  renderTable();
}

function toggleGuide() {
  const box = document.getElementById("guideBox");
  const button = document.getElementById("guideToggleBtn");

  box.classList.toggle("hidden");

  if (box.classList.contains("hidden")) {
    button.textContent = "가이드 보기";
  } else {
    button.textContent = "가이드 닫기";
  }
}

function syncHeaderColumnForScrollbar() {
  const thead = document.querySelector("thead tr");
  const scrollDiv = document.querySelector("#scrollContainer");
  const existingFake = document.querySelector("th.fake-scroll-spacer");

  const hasScrollbar = scrollDiv.scrollHeight > scrollDiv.clientHeight;

  if (hasScrollbar && !existingFake) {
    const th = document.createElement("th");
    th.className = "w-[10px] px-0 py-0 fake-scroll-spacer";
    thead.appendChild(th);
  } else if (!hasScrollbar && existingFake) {
    existingFake.remove();
  }
}