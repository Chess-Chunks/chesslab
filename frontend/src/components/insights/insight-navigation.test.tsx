import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { InsightNavigation } from "@/components/insights/insight-navigation";
import { INSIGHT_GROUPS } from "@/lib/constants";
import { useState } from "react";

const firstGroup = INSIGHT_GROUPS[0];
const firstInsight = firstGroup.insights[0];

describe("InsightNavigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all insight groups", () => {
    // Arrange
    render(<InsightNavigation />);

    // Assert
    for (const group of INSIGHT_GROUPS) {
      expect(screen.getByText(group.label)).toBeInTheDocument();
    }
  });

  it("renders all insights when group is expanded", () => {
    // Arrange
    render(<InsightNavigation />);

    const trigger = screen.getByText(firstGroup.label);

    // Act
    fireEvent.click(trigger);

    // Assert
    for (const insight of firstGroup.insights) {
      expect(screen.getByText(insight.label)).toBeInTheDocument();
    }
  });

  it("calls setCurrentInsight when an insight is clicked", () => {
    // Arrange
    const setCurrentInsight = vi.fn();
    render(<InsightNavigation setCurrentInsight={setCurrentInsight} />);
    const trigger = screen.getByText(firstGroup.label);
    fireEvent.click(trigger); // Expand group

    // Act
    const insightLink = screen.getByText(firstInsight.label);
    fireEvent.click(insightLink);

    // Assert
    expect(setCurrentInsight).toHaveBeenCalledWith(firstInsight.value);
  });

  it("applies active style when currentInsight is set", () => {
    // Arrange
    const Wrapper = () => {
      const [current, setCurrent] = useState<string>();
      return (
        <InsightNavigation
          currentInsight={current}
          setCurrentInsight={setCurrent}
        />
      );
    };
    render(<Wrapper />);
    const trigger = screen.getByText(firstGroup.label);
    fireEvent.click(trigger);

    // Act
    const insightLink = screen.getByText(firstInsight.label);
    fireEvent.click(insightLink);

    // Assert
    expect(insightLink).toHaveClass("bg-muted");
  });
});
