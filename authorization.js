import { Ability, AbilityBuilder } from "@casl/ability";

const defineAbility = () => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.isAdmin) {
    can("manage", "all");
  } else {
    can("read", "Post");
    can("update", "Post", { authorId: user.id }); //Only if they own it
    cannot("delete", "Post").because("Only admins can delete posts!!");
  }

  return build();
};

const user = {
  id: 5,
  isAdmin: false,
};
const ability = defineAbility(user);
const isAllowed = Ability.can("rean", "Settings");

isAllowed;
false;
