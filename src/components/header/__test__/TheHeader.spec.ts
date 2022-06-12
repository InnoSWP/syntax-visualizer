import { describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import TheHeader from "@/components/header/TheHeader.vue"

describe("TheHeader", () => {
  it("contains logo", () => {
    const wrapper = mount(TheHeader, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })

    expect(wrapper.text()).to.contain("Syntax Visualizer")
  })
})
