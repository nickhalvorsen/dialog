// depends on texter.js, vue.js



var dialogBoxComponent = Vue.component('dialog-box', {
    data: function() {
        return {

    message: '',
    choices: [],
    flags : {
        showActions: false,
        showActionOptions: false,
        showActionContinue: false

        }
    }
},

  methods: {
      displayMessage: function(messagePayload) {
          this.message = ''
          this.showActions = false
          var texter = new Texter('dialog-message');
          texter.display(messagePayload.message, 40, () => this.displayActions());
            //this.message = messagePayload.message
            this.choices = messagePayload.choices
      },
      choiceClicked: function(choiceId) {
            console.log('choice clicked ' + choiceId)
      },
      continueClicked: function() {
          console.log('continue clicked')
      },
      displayActions() {
            this.flags.showActions = true
            this.flags.showActionOptions = this.choices !== null && this.choices.length > 0
            this.flags.showActionContinue = !this.flags.showActionOptions

      }
  },
    template: `<div id="dialog">
    <div id="dialog-message" class="dialog-message">
        {{ message }}
    </div>
    <hr/>
    <div v-if="flags.showActions">
        <div class="dialog-options" v-if="flags.showActionOptions">
            <ol>
                <li v-for="choice in choices">
                    <span class="dialog-choice" v-on:click="choiceClicked(choice.id)">
                        {{ choice.text }}
                    </span>
                </li>
            </ol>
        </div>
        <div class="dialog-continue" v-if="flags.showActionContinue">
            <span v-on:click="continueClicked()">
                continue
            </span>
        </div>
    </div>
</div>`
})







