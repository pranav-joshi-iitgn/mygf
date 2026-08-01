import json
import re

# Raw input string containing the formatted quotes
with open("quotes.md",'r') as f:
    raw_data = f.read()

def parse_quotes_to_json(data: str) -> str:
    # Split the raw text into individual quote blocks
    blocks = data.strip().split("\n\n>")

    parsed_data = []

    for block in blocks:
        # Clean leading blockquote markers
        clean_block = block.lstrip(">").strip()

        # Regex pattern to match the text and the metadata line
        pattern = r"^(.*?)\n+>\s*—\s*([^,]+),\s*(.+)$"
        match = re.search(pattern, clean_block, re.DOTALL)

        if match:
            text_content = match.group(1)
            sender = match.group(2).strip()
            date = match.group(3).strip()

            # Clean up residual '>' characters and extra whitespace inside text
            text_lines = [
                line.lstrip(">").strip() for line in text_content.splitlines()
            ]
            clean_text = "\n".join([line for line in text_lines if line])

            parsed_data.append(
                {"sender": sender, "date": date, "message": clean_text}
            )

    return json.dumps(parsed_data, indent=2, ensure_ascii=False)


# Run the conversion
json_output = parse_quotes_to_json(raw_data)
print(json_output)