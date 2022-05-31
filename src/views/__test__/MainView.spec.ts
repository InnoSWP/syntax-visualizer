import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import MainView from "../MainView.vue"

describe("MainView", function () {
  it("renders and shows headings", function () {
    const wrapper = mount(MainView)
    expect(wrapper.text()).toContain("Syntax Visualiser")
    expect(wrapper.text()).toContain("Coming soon... 🚧")
  })
})
