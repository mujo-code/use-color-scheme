workflow "Build and Test" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Lint" {
  needs = ["Install"]
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run lint"
}

action "Test" {
  needs = ["Lint"]
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "test"
}
