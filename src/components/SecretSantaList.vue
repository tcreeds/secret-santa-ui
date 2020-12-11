<template>
    <div class="hello">
        <h1>SANTAAAAAAAAAAA</h1>
        <div v-if="status === 'success'">
            <p> You should be receiving a text message about your secret santa! Have fun:)</p>
        </div>
        <div v-if="status === 'error'">
            <p> Oops somethign seems wrong here, let the devs know! Maybe you were naughty this year!</p>
        </div>
        <div v-if="status === 'loading'">
            <p>loading</p>
        </div>
        <div class="content-section" v-if="status === 'start'">
            <div class="content-section input-grid">
                <label>Organizer Name (and phone number, if you want):</label>
                <input placeholder="Dalinar Kholin (1234567890)" v-model="owner" />
                <label>Date the exchange is happening:</label>
                <input placeholder="12/20 4pm" v-model="dateOfExchange" />
            </div>
            <h3>People Participating:</h3>
            <ul>
                <li v-for="person in people" :key="person.id" class="person-container">
                    <label>Name: </label>
                    <input placeholder="Barack Obama" v-model="person.name" />
                    <label>Phone: </label>
                    <input type="tel" placeholder="1234567890" v-model="person.phone" />
                    <label>Mailing Address (if applicable): </label>
                    <input placeholder="123 Test Dr" v-model="person.address" />
                </li>
            </ul>
            <div class="button-container">
                <button @click="addPerson()">Add Person</button>
            </div>
            <div class="content-section">
            <div class="button-container submit">
                <button class="submit-btn" @click="submit()">DO THE THING</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SecretSantaList',
    data() {
        return {
            status: "start",
            owner: "",
            dateOfExchange: "",
            people: [{
                id: Math.random(),
                name: "",
                phone: "",
                address: ""
            }]
        }
    },
    methods: {
        addPerson(){
            this.people.push({
                id: Math.random(),
                name: "",
                phone: "",
                address: ""
            })
        },
        submit(){
            if (this.owner.length < 1 || this.dateOfExchange.length < 1) {
                alert("You haven't set an organizer or date of exchange. You probably should.")
            }
            const proceed = confirm("Are you sure? This will send a text to each of these people")
            if (proceed) {
                this.status = 'loading';
                const payload = {
                    owner: this.owner,
                    participantsList: this.people,
                    dateOfExchange: this.dateOfExchange
                }
                fetch('https://znssd84jf2.execute-api.us-east-1.amazonaws.com/prod/', {
                    method: 'POST',
                    mode: 'no-cors',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(payload)
                }).then((resp) => {
                    if(resp.ok){
                        this.status = 'success'
                    }else{
                       this.status = 'error'
                    }
                }).catch(() => {
                    this.status = 'error'
                })
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  text-align: left;
}
button {
    border: 2px solid blue;
    background: blue;
    border-radius: 0.3em;
    color: white;
    padding: 0.3em 1em;
}
button:hover {
    background: white;
    color: blue;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 1.5em;
}
a {
  color: #42b983;
}
.content-section {
    margin: 0 auto 1em;
    width: 90%;
    max-width: 50em;
}
.input-grid {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.input-grid > * {
    margin-bottom: 0.5em;
}
.person-container {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.button-container {
    display: flex;
}
.submit {
    justify-content: flex-end;
}
.submit-btn {
    font-size: 1.3em;
}
</style>
