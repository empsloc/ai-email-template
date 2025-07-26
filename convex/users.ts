import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    //if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

      if (user.length > 0) {
        return user[0]; // full user object
      }
    //if user doesnt exist then create new user
    const _id = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      picture: args.picture,
      credits: 3,
    });

    return {
      _id,
      name: args.name,
      email: args.email,
      picture: args.picture,
      credits: 3,
    };
   
  },
});
