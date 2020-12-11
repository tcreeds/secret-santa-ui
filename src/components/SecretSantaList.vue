<template>
    <div class="hello">
        <h1>SANTAAAAAAAAAAA</h1>
        <div class="content-section input-grid">
            <label>Organizer Name (and phone number, if you want):</label>
            <input placeholder="Dalinar Kholin (1234567890)" v-model="owner" />
            <label>Date the exchange is happening:</label>
            <input placeholder="12/20 4pm" v-model="dateOfExchange" />
        </div>
        <div class="content-section">
            <h3>People Participating:</h3>
            <ul>
                <li v-for="person in people" :key="person.id" class="person-container">
                    <label>Name: </label>
                    <input placeholder="Barack Obama" v-model="person.name" />
                    <label>Phone: </label>
                    <input placeholder="1234567890" v-model="person.phone" />
                    <label>Mailing Address (if applicable): </label>
                    <input placeholder="123 Test Dr" v-model="person.address" />
                </li>
                <li v-if="people.length === 0">
                    Add some people to get started
                </li>
            </ul>
            <div class="button-container">
                <button @click="addPerson()">Add Person</button>
            </div>
        </div>
        
        <div class="content-section">
            <div class="button-container submit">
                <button class="submit-btn" @click="submit()">DO THE THING</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SecretSantaList',
    data() {
        return {
            owner: "",
            dateOfExchange: "",
            people: []
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
                const payload = {
                    owner: this.owner,
                    participantList: this.people,
                    dateOfExchange: this.dateOfExchange
                }

                alert(JSON.stringify(payload))
                /*fetch('url', {
                    method: 'POST',
                    data: JSON.stringify(payload)
                })*/
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
