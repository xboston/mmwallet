<script>
    import dayjs from 'dayjs'
    import "dayjs/locale/ru";
    import relativeTime from 'dayjs/plugin/relativeTime';

    dayjs.extend(relativeTime);
    dayjs.locale("ru");

    import { invalidateAll } from '$app/navigation';
    import { truncateHash, getPlanName } from '$lib/utils';

    /** @type {import('./$types').PageData} */
    export let data;

    const app = data.app.result;
    const n2 = data.n2.result;
    const solana = data.solana.result;
    const payments = data.payments.result;
    const wallets = data.wallets.result

    /** @type ReturnType<typeof setTimeout> */
    let timer;

    function rerunLoadFunction() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            invalidateAll();
        }, 250);
    }
</script>

<svelte:head>
    <title>MAPS.ME wallet monitor</title>
    <meta name="description" content="Неофициальный сервис мониторинга состояние проекта MAPS.ME wallet">
</svelte:head>

<h3>Обновлено { dayjs().to(data.now) }</h3>
<section class="grid">
    <div>
        <ul>
            <li>Блокчейна Solana: {@html solana.status ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: lime">проблемы</strong>'}</li>
            <li>Поступление платежей: {@html payments.status ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li>
            <!-- <li>Регистрация кошельков: {@html data.statuses.statuses.wallets.status ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li> -->
            <li>API приложения: {@html n2.apiApplication ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li>
            <li>API моста в Solana: {@html n2.apiSolanaBridge ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li>
        </ul>
    </div>
    <div>
        <ul>
            <li>Версия в Apple Store: <a target="_blank" rel="noopener noreferrer" href="{app.ios.href}" data-tooltip="Последний релиз {dayjs().to(app.ios.releaseDate)}">{app.ios.latest}</a></li>
            <li>Версия в Google Play: <a target="_blank" rel="noopener noreferrer" href="{app.android.href}" data-tooltip="Последний релиз {dayjs().to(app.android.releaseDate)}">{app.android.latest}</a></li>
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
        {#each payments.transactions as payment, i}
        <tr>
            <th scope="row">{i+1}</th>
            <td><a target="_blank" rel="noopener noreferrer" href="//solscan.io/tx/{payment.signature}">{ truncateHash(payment.signature) }</a></td>
            <td><span style="color: { payment.changeType === 'desc' ? 'red':'lime' }">${payment.amount_usd}</span></td>
            <td>{ dayjs().to(payment.time) }</td>
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
        {#each wallets.transactions as wallet, i}
        <tr>
            <th scope="row">{i+1}</th>
            <td><a target="_blank" rel="noopener noreferrer" href="//solscan.io/tx/{wallet.signature}">{ truncateHash(wallet.signature) }</a></td>
            <td>{ getPlanName(wallet.amount_usd) }</td>
            <td>${wallet.amount_usd}</td>
            <td>{ dayjs().to(wallet.time) }</td>
        </tr>
        <tr>
        {/each}
    </tbody>
</table> 
<!-- <details>
    <summary style="opacity: 0.1;" >Как это работает</summary>
    <p>Lorem ipsum — классический текст-«рыба». Является искажённым отрывком из философского трактата Марка Туллия Цицерона «О пределах добра и зла», написанного в 45 году до н. э. на латинском языке, обнаружение сходства приписывается Ричарду Макклинтоку.</p>
</details> -->


<button style="background-color: #296129;" on:click={rerunLoadFunction}>Обновить данные</button>