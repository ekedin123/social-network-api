const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

//reaction schema by id, what the reaction is, who made the rxn, and what date and time it was posted on
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (valueOf) =>
        moment(valueOf).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// thought schema by id, what the reaction is, who made the rxn, and what date and time it was posted on
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (valueOf) =>
        moment(valueOf).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of friends' reactions
thoughtSchema.virtual("reactionCountTotal").get(function () {
  return this.reactions.length;
});

// create the User model and export it
const Thought = model("Thought", thoughtSchema);
module.exports = Thought;
