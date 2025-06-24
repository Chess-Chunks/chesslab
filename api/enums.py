"""This module defines an enumeration for different chess game speed types."""

from enum import Enum

class SpeedType(str, Enum):
    """Enumeration for different chess game speed types."""
    BULLET = "bullet"
    BLITZ = "blitz"
    RAPID = "rapid"
    CLASSICAL = "classical"

    def platform_key(self, platform: str) -> str:
        """Map internal speed types to platform-specific keys."""
        maps = {
            "chessdotcom": {
                SpeedType.BULLET: "chess_bullet",
                SpeedType.BLITZ: "chess_blitz",
                SpeedType.RAPID: "chess_rapid",
                SpeedType.CLASSICAL: "chess_daily",
            },
            "lichess": {
                SpeedType.BULLET: "bullet",
                SpeedType.BLITZ: "blitz",
                SpeedType.RAPID: "rapid",
                SpeedType.CLASSICAL: "classical",
            }
        }
        return maps[platform][self]
