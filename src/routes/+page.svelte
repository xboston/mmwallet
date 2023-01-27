<script>

    import Time from "svelte-time";

    import { dayjs } from "svelte-time";
    import "dayjs/locale/ru";
    dayjs.locale("ru");

    import { invalidateAll } from '$app/navigation';

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type ReturnType<typeof setTimeout> */
    let timer;

    function rerunLoadFunction() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            invalidateAll();
        }, 250);
    }
    // setInterval(async () => {
    //     await rerunLoadFunction();
    // }, 2000);
</script>

<h3>Обновлено <Time live relative timestamp={data.now} /></h3>
<section class="grid">
    <div>
        <ul>
            <li>Блокчейна Solana: {@html data.statuses.statuses.solana.status ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: lime">проблемы</strong>'}</li>
            <li>Поступление платежей: {@html data.statuses.statuses.payments.status ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li>
            <li>Регистрация кошельков: {@html data.statuses.statuses.wallets.status ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li>
            <li>API приложения: {@html data.statuses.statuses.api.api ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li>
            <li>API моста в Solana: {@html data.statuses.statuses.api.apiSolana ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li>
        </ul>
    </div>
    <div>
        <ul>
            <li>Версия в Apple Store: <a target="_blank" rel="noopener noreferrer" href="{data.latest.ios.href}" data-tooltip="Последний релиз {dayjs().to(data.latest.ios.releaseDate)}">{data.latest.ios.latest}</a></li>
            <li>Версия в Google Play: <a target="_blank" rel="noopener noreferrer" href="{data.latest.android.href}" data-tooltip="Последний релиз {dayjs().to(data.latest.android.releaseDate)}">{data.latest.android.latest}</a></li>
        </ul>
    </div>
</section>

<h4>Свежие платежи</h4>
<table role="grid">
    <thead>
        <tr>
        <th scope="col"></th>
        <th scope="col">signature</th>
        <th scope="col">amount</th>
        <th scope="col">time</th>
        </tr>
    </thead>
    <tbody>
        {#each data.latest.payments.data as item, i}
        <tr>
            <th scope="row">{i+1}</th>
            <td> <a target="_blank" rel="noopener noreferrer" href="//solscan.io/tx/{item.signature}">{item.signature_short}</a></td>
            <td>${item.amount_usd}</td>
            <td><Time live relative timestamp="{item.time}" title="{item.time}" /></td>
        </tr>
        <tr>
        {/each}
    </tbody>
</table>

<h4>Свежие регистрации</h4>
<table role="grid">
    <thead>
        <tr>
        <th scope="col"></th>
        <th scope="col">signature</th>
        <th scope="col">plan</th>
        <th scope="col">amount</th>
        <th scope="col">time</th>
        </tr>
    </thead>
    <tbody>
        {#each data.latest.wallets.data as item, i}
        <tr>
            <th scope="row">{i+1}</th>
            <td> <a target="_blank" rel="noopener noreferrer" href="//solscan.io/tx/{item.signature}">{item.signature_short}</a></td>
            <td>{item.plan}</td>
            <td>${item.amount_usd}</td>
            <td><Time live relative timestamp="{item.time}" title="{item.time}" /></td>
        </tr>
        <tr>
        {/each}
    </tbody>
</table>
<!-- <details>
    <summary style="opacity: 0.1;" >Как это работает</summary>
    <p>Lorem ipsum — классический текст-«рыба». Является искажённым отрывком из философского трактата Марка Туллия Цицерона «О пределах добра и зла», написанного в 45 году до н. э. на латинском языке, обнаружение сходства приписывается Ричарду Макклинтоку.</p>
</details> -->


<button on:click={rerunLoadFunction}>Обновить данные</button>