import { describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import ThemeToggle from "@/components/ThemeToggle.vue"
import { getNextTheme, useSettingsStore } from "@/stores/settings"

describe("ThemeToggle", () => {
  const wrapper = mount(ThemeToggle, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
        }),
      ],
    },
  })

  it("toggles theme", async () => {
    const settings = useSettingsStore()

    for (let i = 0; i < 15; i++) {
      const nextTheme = getNextTheme(settings.theme)
      await wrapper.get("button").trigger("click")
      expect(settings.toggleTheme).toBeCalledTimes(i + 1)
      expect(settings.theme).toBe(nextTheme)
    }
  })
})
